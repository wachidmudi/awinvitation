import { redirect } from 'next/navigation';
import { getInfo } from '~/lib/api';
const i = getInfo();

export default async function Page() {
  redirect('/' + i.app.slug);
}
