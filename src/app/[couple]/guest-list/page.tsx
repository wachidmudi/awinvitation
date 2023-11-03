import { Metadata } from 'next';
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

  return <GuestListPage data={data} />;
};

export default Page;
