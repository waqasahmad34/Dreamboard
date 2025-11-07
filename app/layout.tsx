import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { CommentsProvider } from '@/providers/CommentsProvider';
import QueryProvider from '@/providers/QueryProvider';
import { SocialReactionsProvider } from '@/providers/SocialReactionsProvider';

import cn from '@/utils/cn';

import './globals.css';
import './fonts.css';
import BottomBar from '@/components/BottomBar';
import ButtonScrollTop from '@/components/Buttons/ButtonScrollTop';
// import ScriptFreshChat from '@/components/Scripts/ScriptFreshChat';
import ScriptGTM from '@/components/Scripts/ScriptGTM/ScriptGTM';
import ScriptGTMNoScript from '@/components/Scripts/ScriptGTM/ScriptGTMNoScript';

// import ButtonChat from '@/components/Buttons/ButtonChat';
// import TopBar from '@/components/TopBar';

const josefinSans = Josefin_Sans({
  variable: '--font-josefin-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Dreamsofa ',
  description: 'Dreamsofa',
  viewport: 'width=device-width, initial-scale=1',

  icons: {
    icon: [
      {
        url: '/your-dreamboard-results/favicon/favicon.ico?v=1',
        type: 'image/x-icon',
      },
      {
        url: '/your-dreamboard-results/favicon/favicon-16x16.png?v=1',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/your-dreamboard-results/favicon/favicon-32x32.png?v=1',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/your-dreamboard-results/favicon/apple-touch-icon.png?v=1',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  manifest: '/your-dreamboard-results/favicon/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('RootLayout -> NODE_ENV', process.env.NODE_ENV);
  console.log('RootLayout -> ENVIRONMENT', process.env.ENVIRONMENT);
  return (
    <html lang="en" data-theme="light" className="h-full">
      <body
        className={cn(
          josefinSans.variable,
          'flex flex-col',
          'min-h-full',
          'max-w-100vw',
          'antialiased',
          'overflow-x-hidden',
        )}
      >
        <QueryProvider>
          <CommentsProvider>
            <SocialReactionsProvider>
              {process.env.ENVIRONMENT === 'production' && (
                <>
                  <ScriptGTM />
                  <ScriptGTMNoScript />
                </>
              ) 
              // : (
              //   <ScriptFreshChat />
              // )
              }

              <Nav className="" />
              <div
                className={cn(
                  // 'min-h-[80vh]',
                  'grow',
                )}
              >
                {children}
              </div>
              <Footer />
              <BottomBar />
              <ButtonScrollTop />
              {/* <ButtonChat /> */}
            </SocialReactionsProvider>
          </CommentsProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
