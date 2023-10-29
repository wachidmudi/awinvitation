import { Metadata } from 'next';
import { decode, encode, isUrlSafeBase64 } from 'url-safe-base64';
import { Template1 } from '~/components/wedding/template-1';
import { getInfo } from '~/lib/api';
// import { getGuestBooks } from '~/lib/supabase/requests';

const i = getInfo();

export const metadata: Metadata = {
  title: `${i.bride_name} & ${i.groom_name}`,
};

interface Props {
  params: {
    path: string[];
  };
}

const base64Utils = {
  encode(str: string) {
    return Buffer.from(str, 'utf-8').toString('base64');
  },
  decode(base64: string) {
    return Buffer.from(base64, 'base64').toString('utf-8');
  },
};

function createInviteeName(str: string) {
  return base64Utils.encode(encode(str));
}

function getInviteeName(base64: string) {
  const name = base64 || '';
  return isUrlSafeBase64(name) ? base64Utils.decode(decode(name)) : '';
}

export default async function Page({ params }: Props) {
  const [slug, inviteeSlug] = params.path;
  // const guestBooks = await getGuestBooks();
  // console.log('guestBooks', guestBooks);
  const inviteeName = getInviteeName(inviteeSlug);
  console.log('inviteeName', inviteeName);

  return <Template1 inviteeName={inviteeName} guestBooks={[]} />;
}
