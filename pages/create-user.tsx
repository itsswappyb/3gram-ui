import React from 'react';

interface Props {
  username: string;
  name: string;
  bio: string;
  avatar: string;
}

const CreateUser: React.FC<Props> = () => {
  return (
    <div>
      <h1>Create User</h1>
    </div>
  );
};

export default CreateUser;

//  // Create User
//  const {config} = usePrepareContractWrite({
//     addressOrName: CONTRACT_ADDRESS,
//     contractInterface: [
//       {
//         inputs: [
//           {
//             internalType: 'string',
//             name: '_username',
//             type: 'string',
//           },
//           {
//             internalType: 'string',
//             name: '_name',
//             type: 'string',
//           },
//           {
//             internalType: 'string',
//             name: '_bio',
//             type: 'string',
//           },
//           {
//             internalType: 'string',
//             name: '_avatar',
//             type: 'string',
//           },
//         ],
//         name: 'createUser',
//         outputs: [],
//         stateMutability: 'nonpayable',
//         type: 'function',
//       },
//     ],
//     functionName: 'createUser',
//     args: [
//       username,
//       `${username}-${Math.floor(Math.random() * 50)}`,
//       'test bio',
//       'https://openseauserdata.com/files/22b10da7fb2cafbf2a76898f185e010f.svg',
//     ],
//   });
//   const {
//     data: createUserData,
//     isLoading: createUserLoading,
//     isSuccess: createUserSuccess,
//     write: createUserWrite,
//   } = useContractWrite(config);
