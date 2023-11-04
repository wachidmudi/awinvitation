import { Metadata } from 'next';
import { env } from '~/configs/env';
import { getInvitees } from '~/lib/data/get-invitees';
import { GuestListPage } from './_components/guest-list.page';

interface Props {
  params: {
    couple: string;
  };
}

export const metadata: Metadata = {
  title: 'Daftar Tamu Undangan',
};

const Page = async ({ params }: Props) => {
  const data = await getInvitees();
  const url = env.APP_URL + '/' + params.couple;

  return <GuestListPage url={url} data={data} />;
};

export default Page;
