import { Metadata } from 'next';
import { Open_Sans, Playfair_Display, Rouge_Script } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { MobileLayout } from '~/components/layout/mobile';
import { env } from '~/configs/env';
import { RootStyleRegistry } from './emotion';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});
const rougeScript = Rouge_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-rouge-script',
});
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: '600',
  variable: '--font-playfair-display',
});

export const metadata: Metadata = {
  title: {
    default: env.APP_NAME,
    template: `%s - ${env.APP_NAME}`,
  },
  description: 'Broadcast your invitation',
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${rougeScript.variable} ${playfairDisplay.variable}`}
    >
      <body>
        <Toaster position="bottom-center" />
        <RootStyleRegistry>
          <MobileLayout>{children}</MobileLayout>
        </RootStyleRegistry>
      </body>
    </html>
  );
}
