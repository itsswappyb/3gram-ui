import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {useAccount, useDisconnect} from 'wagmi';

import {utils} from 'ethers';

import {useEffect} from 'react';
import {useRouter} from 'next/router';

// import {CONTRACT_ADDRESS} from '@utils/constants';
// import {getProfiles} from '../graphql/queries';

export default function Home() {
  const {address: stringAddress, isConnected} = useAccount();
  const convertedAddress = stringAddress && utils.getAddress(stringAddress);
  const {disconnect} = useDisconnect();
  const router = useRouter();

  const hasWindow = typeof window !== 'undefined';

  // call contract getUsername
  // const {config: getUsernameConfig} = usePrepareContractWrite({
  //   addressOrName: CONTRACT_ADDRESS,
  //   contractInterface: [
  //     {
  //       inputs: [
  //         {
  //           internalType: 'address',
  //           name: '_wallet',
  //           type: 'address',
  //         },
  //       ],
  //       name: 'getUsername',
  //       outputs: [
  //         {
  //           internalType: 'string',
  //           name: '',
  //           type: 'string',
  //         },
  //       ],
  //       stateMutability: 'view',
  //       type: 'function',
  //     },
  //   ],
  //   functionName: 'getUsername',
  //   args: [convertedAddress],
  // });
  // const {
  //   data: getUsernameData,
  //   isLoading: getUsernameLoading,
  //   isSuccess: getUsernameSuccess,
  //   write: getUsernameWrite,
  // } = useContractWrite(getUsernameConfig);

  // get username from redux store
  // if username is empty, get username from contract
  // if username from contract is empty, then redirerct to create user

  useEffect(() => {
    if (isConnected) {
      router.replace('/create-user');
    }
  }, []);

  // console.log(getUsernameData);
  // useEffect(() => {
  //   if (isConnected && usernameState) {
  //     // if they have a username set the username to global state
  //     // dispatch(createUsername(username));
  //     router.replace('/feed');
  //   } else if (
  //     isConnected &&
  //     !usernameState &&
  //     getUsernameSuccess &&
  //     !getUsernameData
  //   ) {
  //     router.replace('/create-user');
  //   }
  // }, [isConnected, usernameState]);

  return (
    <div className={styles.container}>
      <Head>
        <title>3gram - privacy focussed web3 photo and video sharing</title>
        <meta name="description" content="Powered by Web3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="flex flex-col justify-center py-56 items-center">
          <h1 className="py-6 text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500  to-pink-500">
            3gram
          </h1>
          <p className="mb-6 text-2xl font-bold text-slate-600 wrap">
            Privacy focussed web3 photo and video sharing
          </p>
        </div>
      </div>
    </div>
  );
}
