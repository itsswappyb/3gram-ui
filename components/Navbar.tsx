import React from 'react';
import Link from 'next/link';
import {ConnectButton} from '@rainbow-me/rainbowkit';
import {useAccount} from 'wagmi';

const Navbar: React.FC = () => {
  const {isConnected} = useAccount();
  return (
    <nav className="flex justify-around py-9 items-center">
      <Link
        href="/feed"
        className="shadow-md-secondary text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500  to-pink-500"
      >
        3gram
      </Link>

      <div className="flex justify-between space-x-20">
        <Link
          href="/feed"
          className="text-md text-center font-bold hover:text-primary hover:opacity-70"
        >
          Feed
        </Link>

        <Link
          href="/lens"
          className="text-md text-center font-bold hover:text-primary  hover:opacity-70"
        >
          Lens
        </Link>

        <Link
          href="/nfts"
          className="text-md text-center font-bold hover:text-primary  hover:opacity-70"
        >
          NFTs
        </Link>
      </div>

      <ConnectButton />
    </nav>
  );
};

export default Navbar;
