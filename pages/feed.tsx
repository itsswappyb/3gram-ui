import Layout from '@components/Layout';
import React, {useEffect, useState, useRef, MouseEventHandler} from 'react';

import {useRouter} from 'next/router';
import Stories from '@components/Stories';
import {
  useAccount,
  useConnect,
  useDisconnect,
  usePrepareContractWrite,
  useContractWrite,
} from 'wagmi';

import {
  Card,
  CardHeader,
  Flex,
  Avatar,
  Heading,
  IconButton,
  CardBody,
  CardFooter,
  Button,
  Box,
  Text,
  Image,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  FormControl,
  ModalBody,
  FormLabel,
  ModalFooter,
} from '@chakra-ui/react';

import {CONTRACT_ADDRESS, ABI} from '@utils/constants';

import {BiLike, BiChat, BiShare, BiPlus} from 'react-icons/bi';
import saveToIPFS from '@utils/saveToIPFS';
import {useQuery} from '@apollo/client';
import {getProfiles} from 'graphql/queries';
// import {Box} from 'framer-motion';

import {Spinner} from '@chakra-ui/react';

const feed = () => {
  const {address, isConnected} = useAccount();
  const {disconnect} = useDisconnect();
  const router = useRouter();

  const {isOpen, onOpen, onClose} = useDisclosure();

  const [file, setFile] = useState<string>('');
  const [postTitle, setPostTitle] = useState<string>('');

  const initialRef: React.MutableRefObject<null> = useRef(null);
  const finalRef: React.MutableRefObject<null> = useRef(null);
  const fileRef: React.MutableRefObject<null> = useRef(null);
  const [username, setUsername] = useState<string>('');

  const {loading, error, data: profileData} = useQuery(getProfiles);
  console.log('feed profiles: ', profileData);

  // createPost function
  // TODO: call this function
  const {config: createPostConfig} = usePrepareContractWrite({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: [
      {
        inputs: [
          {
            internalType: 'string',
            name: '_title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_media',
            type: 'string',
          },
        ],
        name: 'createPost',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    functionName: 'createPost',
    args: [String(postTitle)],
  });
  const {
    data: createPostData,
    isLoading: createPostLoading,
    isSuccess: createPostSuccess,
    write: createPostWrite,
  } = useContractWrite(createPostConfig);

  // Create User
  const {config} = usePrepareContractWrite({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: [
      {
        inputs: [
          {
            internalType: 'string',
            name: '_username',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_bio',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_avatar',
            type: 'string',
          },
        ],
        name: 'createUser',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    functionName: 'createUser',
    args: [
      username,
      `${username}-${Math.floor(Math.random() * 50)}`,
      'test bio',
      'https://openseauserdata.com/files/22b10da7fb2cafbf2a76898f185e010f.svg',
    ],
  });
  const {
    data: createUserData,
    isLoading: createUserLoading,
    isSuccess: createUserSuccess,
    write: createUserWrite,
  } = useContractWrite(config);

  const handleCreatePost = async (e: Event) => {
    e.preventDefault();
    console.log('submitting...');
    console.log('post title: ', postTitle);
    console.log('image file: ', file);
    // await saveToIPFS
    await saveToIPFS(file);
    // create post
    await createPostWrite?.();
  };
  const _profileData =
    profileData &&
    profileData?.profiles?.filter((profile, idx) => profile?.id !== 1);

  const sixProfiles = _profileData?.slice(5);

  const currentUserOnLens = sixProfiles?.filter(
    (profile, idx) => profile.owner === address,
  );

  useEffect(() => {
    if (!isConnected) {
      // disconnect();

      router.push('/');
    }
  }, [isConnected]);

  useEffect(() => {
    // createUser
    if (!username) {
      createUserWrite?.();
    }
  }, []);

  return (
    <Layout>
      <div className="flex justify-center">
        <Stories profileData={sixProfiles} />
      </div>
      <Flex
        flex="1"
        gap="4"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        className="mt-12"
      >
        {/* <Button colorScheme="messenger" className="pointer">
          Create Post
        </Button> */}

        {/* MODAL */}
        <>
          <Button
            ml={4}
            ref={finalRef}
            colorScheme="messenger"
            className="pointer"
            onClick={onOpen}
          >
            Create Post
          </Button>

          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={!createPostSuccess && !createUserSuccess ? isOpen : false}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create Post</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Post Title</FormLabel>
                  <Input
                    ref={initialRef}
                    value={postTitle}
                    placeholder="Post Title"
                    onChange={e => setPostTitle(e.target.value)}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Upload Image</FormLabel>
                  {/* <Input placeholder="Image URL" /> */}
                  <div
                    onClick={() => {
                      // @ts-ignore
                      fileRef?.current?.click();
                    }}
                    className="border-2 w-full border-gray-600  border-dashed rounded-md mt-2 p-2  h-12 items-center justify-center flex"
                  >
                    {file ? (
                      <img
                        onClick={() => {
                          // @ts-ignore
                          fileRef?.current?.click();
                        }}
                        // @ts-ignore
                        src={URL.createObjectURL(file)}
                        alt="thumbnail"
                        className="h-full rounded-md"
                      />
                    ) : (
                      <BiPlus size={40} color="gray" />
                    )}
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    ref={fileRef}
                    // accept={'file/*'}
                    onChange={e => {
                      // @ts-ignore
                      setFile(e.target.files[0]);
                      // @ts-ignore
                      console.log(e.target.files[0]);
                    }}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="messenger"
                  mr={3}
                  type="submit"
                  // @ts-ignore
                  onClick={handleCreatePost}
                >
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      </Flex>
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
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Chakra UI"
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
                    <Text>Techno King, Doge Father Clubhouse</Text>
                  </Box>
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody>
              <Text>I like crypto.</Text>
            </CardBody>
            <Image
              objectFit="cover"
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Chakra UI"
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

export default feed;
