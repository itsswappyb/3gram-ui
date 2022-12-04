import Image from 'next/image';
import Layout from '@components/Layout';
import React, {useEffect, useState} from 'react';
import {useAccount, useConnect, useDisconnect} from 'wagmi';
import {useRouter} from 'next/router';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import {BiChat, BiLike, BiShare} from 'react-icons/bi';

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
      <h2 className="text-2xl text-center font-extrabold">NFTs</h2>
      <div className="flex justify-center my-6">
        <div className="grid grid-cols-2 gap-9">
          <Card maxW="md">
            <CardHeader>
              {/* @ts-ignore */}
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar
                    name="Doodles"
                    src="https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?auto=format&w=384"
                  />

                  <Box>
                    <Heading size="sm">@somedude.lens</Heading>
                    <Text>HODLer, Doodles</Text>
                  </Box>
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody>
              <Text>Doodles are safer than FTX.</Text>
            </CardBody>
            <Image
              objectFit="cover"
              src="/../public/images/rick.jpeg"
              alt="Chakra UI"
              width={90}
              height={90}
            />

            <CardFooter
              justify="space-between"
              flexWrap="wrap"
              sx={{
                '& > button': {
                  minW: '136px',
                },
              }}
            >
              <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
                Like
              </Button>
              <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
                Comment
              </Button>
              <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
                Share
              </Button>
            </CardFooter>
          </Card>
          {/* Another Card */}
          <Card maxW="md">
            <CardHeader>
              {/* @ts-ignore */}
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar
                    name="DFC"
                    src="https://openseauserdata.com/files/22b10da7fb2cafbf2a76898f185e010f.svg"
                  />
                  <Box>
                    <Heading size="sm">@elon.lens</Heading>
                    <p>Techno King, Doge Father Clubhouse</p>
                  </Box>
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody>
              <p>I like crypto.</p>
            </CardBody>
            <Image
              objectFit="cover"
              src="/../public/images/rick.jpeg"
              alt="Chakra UI"
              width={90}
              height={90}
            />

            <CardFooter
              justify="space-between"
              flexWrap="wrap"
              sx={{
                '& > button': {
                  minW: '136px',
                },
              }}
            >
              <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
                Like
              </Button>
              <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
                Comment
              </Button>
              <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
                Share
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default nfts;
