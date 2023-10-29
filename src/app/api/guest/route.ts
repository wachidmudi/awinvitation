import { type NextRequest } from 'next/server';
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
    return Response.json(error, { status: 500 });
  }

  return Response.json({ from, to, total: count, items: data ?? [] });
}

export async function POST(request: Request) {
  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY ?? '',
  //   },
  //   body: JSON.stringify({ time: new Date().toISOString() }),
  // })

  // const data = await res.json()

  // return Response.json(data)

  const res = await request.json();
  return Response.json({ res });
  return Response.json({ time: new Date().toISOString() });
}
