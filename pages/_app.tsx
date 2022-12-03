import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {ChakraProvider} from '@chakra-ui/react';
import {extendTheme} from '@chakra-ui/react';

const colors = {
  brand: {
    900: '#1d4ed8',
    800: '#2563eb',
    700: '#3b82f6',
  },
};

const theme = extendTheme({colors});

export default function App({Component, pageProps}: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
