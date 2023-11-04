import dayjs from 'dayjs';
import { Metadata } from 'next';
import { Template1 } from '~/components/wedding/template-1';
import { env } from '~/configs/env';
import { getInfo } from '~/lib/api';
import { getInvitees } from '~/lib/data/get-invitees';

const i = getInfo();
const couple = `${i.bride_name} & ${i.groom_name}`; // TODO: Make this dynamic based couple slug
const description = `${couple}'s Wedding - Hi, You Are Invited! ❤️ Open Invitation ${couple} ${dayjs(
  i.date
).format(
  'DD . MM . YYYY'
)} “And of His signs is that He created for you from yourselves mates that you may find tranquillity in them; and He placed between you affection and mercy. Indeed in that are signs for a […]`;

interface Props {
  params: {
    couple: string;
    code: string;
  };
}

export function generateMetadata({ params }: Props): Metadata {
  const { couple: coupleSlug, code } = params;
  let url = `/${coupleSlug}`;
  if (code && code !== '-') {
    url += `/${params.code}`;
  }
  return {
    title: couple,
    description,
    openGraph: {
      title: couple,
      description,
      url,
      images: [
        {
          url: '/couple.jpg',
          type: 'image/jpg',
          alt: env.APP_NAME,
        },
      ],
    },
    twitter: {
      title: couple,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

const Page = async ({ params }: Props) => {
  const { code } = params;
  let name: string | undefined = undefined;

  if (code && code !== '-') {
    const invitee = await getInvitees();
    const list = [...invitee.bride, ...invitee.groom];
    name = list.find(invitee => invitee.code === code)?.name;
  }

  return <Template1 inviteeName={name} />;
};

export default Page;
