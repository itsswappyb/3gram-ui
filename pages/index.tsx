import {Button} from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';

import {ConnectButton} from '@rainbow-me/rainbowkit';
import Layout from '@components/Layout';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {CONTRACT_ADDRESS} from '@utils/constants';
import {getProfiles} from '../graphql/queries';
import useGetHandle from '@hooks/useGetHandle';

export default function Home() {
  const {address, isConnected} = useAccount();
  const {disconnect} = useDisconnect();
  const router = useRouter();

  const hasWindow = typeof window !== 'undefined';

  useEffect(() => {
    if (isConnected) {
      router.push('/feed');
    }
  }, [isConnected]);

  return (
    <div className={styles.container}>
      <Head>
        <title>3gram - privacy focussed web3 photo and video sharing</title>
        <meta name="description" content="Powered by Web3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col justify-center py-56 items-center">
        <h1 className="py-6 text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500  to-pink-500">
          3gram
        </h1>
        <p className="mb-6 text-2xl font-bold text-slate-600">
          Privacy focussed web3 photo and video sharing
        </p>
        <ConnectButton />
      </div>
    </div>
  );
}
