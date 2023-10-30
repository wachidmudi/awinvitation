import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { supabaseClient as client } from '~/lib/supabase';
import { GuestBookResponse } from '~/lib/supabase/requests';

export interface PaginateGuestBookResponse {
  from: number;
  to: number;
  total: number;
  items: GuestBookResponse[];
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const from = Number(searchParams.get('from'));
  const to = Number(searchParams.get('to'));
  const { data, error, count } = await client
    .from('guest_books')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)
    .returns<GuestBookResponse[]>();
  // .eq('app_id', appId);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json({ from, to, total: count, items: data ?? [] });
}

export async function POST(request: Request) {
  try {
    const value = await request.json();

    if (!value.name) {
      throw new Error('Silakan isi nama');
    }

    if (!value.comment) {
      throw new Error('Silakan isi pesan');
    }

    const { data, error } = await client
      .from('guest_books')
      .insert({
        app_id: value.appId || '',
        name: value.name,
        group: value.group || '',
        comment: value.comment,
      })
      .select();

    if (error) throw error;

    if (cookies().has('comment_count')) {
      let count = Number(cookies().get('comment_count')?.value);
      if (Number.isNaN(count)) {
        count = 0;
      }

      if (count >= 2) throw new Error('Hanya bisa memberi pesan 2x sehari');

      cookies().set('comment_count', '2', {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
      });
    } else {
      cookies().set('comment_count', '1', {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(error, { status: 500 });
  }
}
