import React, {ReactNode} from 'react';
import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head';
import Navbar from '@components/Navbar';

type LayoutProps = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({
  children,
  title = '3gram - privacy first photo and video sharing',
}: LayoutProps) => (
  <div className="flex h-full flex-col ">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <NextNProgress height={2} color="#1d4ed8" options={{showSpinner: false}} />
    <Navbar />
    <main className="font-satoshi">{children}</main>
  </div>
);

export default Layout;
