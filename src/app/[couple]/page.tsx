import { redirect } from 'next/navigation';

interface Props {
  params: {
    couple: string;
  };
}

const Page = ({ params }: Props) => {
  redirect('/' + params.couple + '/-');
};

export default Page;
