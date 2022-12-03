import Layout from '@components/Layout';
import React, {useEffect, useState} from 'react';
import {useAccount, useConnect, useDisconnect} from 'wagmi';
import {useRouter} from 'next/router';

const nfts = () => {
  const {address, isConnected} = useAccount();
  const {disconnect} = useDisconnect();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      disconnect();
      router.push('/');
    }
  }, [isConnected]);

  return (
    <Layout>
      <p>nfts...</p>
    </Layout>
  );
};

export default nfts;
