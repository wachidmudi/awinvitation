import { supabaseClient as client } from './client';

export interface GuestBookPayload {
  appId: string;
  name: string;
  group: string;
  comment: string;
}

export interface GuestBookResponse {
  id: number;
  appId: string | null;
  name: string | null;
  group: string | null;
  comment: string | null;
  created_at: string;
  updated_at: string;
}

export const getGuestBooks = async ({ appId }: { appId?: string } = {}) => {
  const { data, error } = await client
    .from('guest_books')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);
  // .eq('app_id', appId);

  if (error) {
    console.error('Unable to fetch guest books :', error.message);
    return [];
  }

  return data as GuestBookResponse[];
};

export const postGuestBook = async (value: GuestBookPayload) => {
  const { data, error } = await client
    .from('guest_books')
    .insert({
      app_id: value.appId,
      name: value.name,
      group: value.group,
      comment: value.comment,
    })
    .select();

  if (error) {
    console.error('Unable to post a guest book :', error.message);
    return null;
  }

  return data;
};
