import { Provider } from '@/components/ui/provider';
import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from 'next-auth/react';
import { ConfirmDeleteProvider } from '@/components/shared/DeleteModal';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Landit',
  description:
    'Landit is a modern job application tracker that helps you organize, manage, and monitor your job search in one place.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SessionProvider>
          <Provider>
            <ConfirmDeleteProvider>{children}</ConfirmDeleteProvider>

            <Toaster />
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
