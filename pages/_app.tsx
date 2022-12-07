import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {ChakraProvider} from '@chakra-ui/react';
import {extendTheme} from '@chakra-ui/react';

import '@rainbow-me/rainbowkit/styles.css';
import {getDefaultWallets, RainbowKitProvider} from '@rainbow-me/rainbowkit';
import {Chain, chain, configureChains, createClient, WagmiConfig} from 'wagmi';
import {alchemyProvider} from 'wagmi/providers/alchemy';
import {infuraProvider} from 'wagmi/providers/infura';
import {jsonRpcProvider} from 'wagmi/providers/jsonRpc';
import {publicProvider} from 'wagmi/providers/public';
import {getDefaultProvider} from 'ethers';

import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';

import {store as reduxStore} from '../store';
import {Provider as ReduxProvider} from 'react-redux';

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID || '';
const infuraId = process.env.NEXT_PUBLIC_INFURA_KEY || '';

// const foundry: Chain = {
//   ...chain.localhost,
//   id: 1337,
//   name: 'Foundry',
//   rpcUrls: {
//     default: 'https:/localhost:8545',
//   },
//   blockExplorers: {
//     default: {name: 'SnowTrace', url: 'https://snowtrace.io'},
//   },
// };

const {chains, provider} = configureChains(
  [
    // chain.mainnet,
    // chain.polygon,
    // chain.optimism,
    // chain.arbitrum,
    chain.polygonMumbai,
    // chain.localhost,
    // foundry,
  ],
  // [alchemyProvider({apiKey: alchemyId}), publicProvider()],
  [infuraProvider({apiKey: infuraId})],
  // [
  //   jsonRpcProvider({
  //     rpc: chain => ({
  //       // http: `https://${chain.id}.example.com`,
  //       http: `https://localhost:8545`,
  //       // webSocket: `wss://${chain.id}.example.com`,
  //     }),
  //   }),
  // ],
);

const {connectors} = getDefaultWallets({
  appName: '3gram',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  // provider: getDefaultProvider(),
  provider,
});

const colors = {
  brand: {
    900: '#1d4ed8',
    800: '#2563eb',
    700: '#3b82f6',
  },
};

const theme = extendTheme({colors});

const apolloClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/anudit/lens-protocol',
  cache: new InMemoryCache(),
});

const livepeerClient = createReactClient({
  provider: studioProvider({apiKey: process.env.NEXT_PUBLIC_LIVEPEER_KEY}),
});

export default function App({Component, pageProps}: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ReduxProvider store={reduxStore}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains}
            initialChain={chain.polygonMumbai}
          >
            <ChakraProvider theme={theme}>
              <LivepeerConfig client={livepeerClient}>
                <Component {...pageProps} />
              </LivepeerConfig>
            </ChakraProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </ReduxProvider>
    </ApolloProvider>
  );
}
