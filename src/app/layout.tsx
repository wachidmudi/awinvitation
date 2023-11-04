import { Metadata } from 'next';
import {
  Cormorant_Garamond,
  Open_Sans,
  Playfair_Display,
  Rouge_Script,
} from 'next/font/google';
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
const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-cormorant-garamond',
});

export const metadata: Metadata = {
  metadataBase: new URL(env.APP_URL),
  title: {
    default: env.APP_NAME,
    template: `%s - ${env.APP_NAME}`,
  },
  description: 'Broadcast your invitation',
  openGraph: {
    title: {
      default: env.APP_NAME,
      template: `%s - ${env.APP_NAME}`,
    },
    siteName: env.APP_NAME,
    description: 'Broadcast your invitation',
    type: 'website',
    url: '/',
    locale: 'id_ID',
  },
  twitter: {
    title: {
      default: env.APP_NAME,
      template: `%s - ${env.APP_NAME}`,
    },
    description: 'Broadcast your invitation',
    creator: env.APP_NAME,
    card: 'summary_large_image',
  },
  authors: {
    name: env.APP_NAME,
    url: '/',
  },
  applicationName: env.APP_NAME,
  alternates: {
    canonical: '/',
  },
  formatDetection: {
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${rougeScript.variable} ${playfairDisplay.variable} ${cormorantGaramond.variable}`}
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
