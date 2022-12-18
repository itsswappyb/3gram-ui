import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {CONTRACT_ADDRESS} from '@utils/constants';
import React, {ChangeEvent, useState} from 'react';
import {useContractWrite, usePrepareContractWrite} from 'wagmi';
import {createUsername} from 'slices/userSlice';

interface Props {
  username: string;
  name?: string;
  bio?: string;
  avatar?: string;
}

const CreateUser: React.FC<Props> = () => {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');

  const usernameState = useAppSelector(state => state.user.username);
  const dispatch = useAppDispatch();

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
      //   `${username}-${Math.floor(Math.random() * 50)}`,
      name,
      bio,
      'https://openseauserdata.com/files/22b10da7fb2cafbf2a76898f185e010f.svg',
    ],
  });
  const {
    data: createUserData,
    isLoading: createUserLoading,
    isSuccess: createUserSuccess,
    write: createUserWrite,
  } = useContractWrite(config);
  ``;

  const isNameError = name == '';
  const isUsernameError = username == '';
  const isBioError = bio == '';
  const isAvatarError = avatar == '';

  const handleCreateUser = async (e: any): Promise<void> => {
    e.preventDefault();
    await dispatch(createUsername(username));
    try {
      createUserWrite?.();
    } catch (err: any) {
      console.log(err.data.message);
    }
  };

  return (
    <>
      <h1 className="py-6 text-4xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500  to-pink-500">
        3gram
      </h1>
      <Flex justify="center">
        <form
          onSubmit={() => console.log('submitting')}
          className="w-2/3 max-w-2/4 text-center"
        >
          <FormControl isInvalid={isNameError} className="mt-6">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e: ChangeEvent) =>
                // @ts-ignore
                setName(e?.currentTarget?.value)
              }
              className="flex"
            />
            {isNameError && (
              <FormErrorMessage>Name is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isUsernameError}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e: ChangeEvent) =>
                // @ts-ignore
                setName(e?.currentTarget?.value)
              }
            />
            {isUsernameError && (
              <FormErrorMessage>Username is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isBioError}>
            <FormLabel>Bio</FormLabel>
            <Input
              type="text"
              value={bio}
              onChange={(e: ChangeEvent) =>
                // @ts-ignore
                setName(e?.currentTarget?.value)
              }
            />
            {isBioError && (
              <FormErrorMessage>Bio is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isAvatarError}>
            <FormLabel>Avatar</FormLabel>
            <Input
              type="text"
              value={avatar}
              onChange={(e: ChangeEvent) =>
                // @ts-ignore
                setName(e?.currentTarget?.value)
              }
            />
            {isAvatarError && (
              <FormErrorMessage>Avatar is required.</FormErrorMessage>
            )}
          </FormControl>
          <Button
            mt={4}
            colorScheme="messenger"
            // isLoading={}
            type="submit"
            className="w-full"
          >
            Create User
          </Button>
        </form>
      </Flex>
    </>
  );
};

export default CreateUser;
