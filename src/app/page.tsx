import { redirect } from 'next/navigation';
import { getInfo } from '~/lib/api';
const i = getInfo();

const Page = () => {
  redirect('/' + i.app.slug);
};

export default Page;
