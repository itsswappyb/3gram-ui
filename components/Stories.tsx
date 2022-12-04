import {Avatar, Wrap, WrapItem} from '@chakra-ui/react';
import React from 'react';

const Stories = ({profileData}: any) => {
  const profilePics = [
    {
      id: 0,
      url: 'https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?auto=format&w=384',
    },
    {
      id: 1,
      url: 'https://img.seadn.io/files/eb92fda9bbe894cd108bfbf9bdc97b43.png?auto=format&fit=max&w=750',
    },
    {
      id: 2,
      url: 'https://img.seadn.io/files/62e378fd2586bcc0447be3ba12844012.png?auto=format&fit=max&w=750',
    },
    {
      id: 3,
      url: 'https://openseauserdata.com/files/f960605431343a1637e977510172285d.svg',
    },
    {
      id: 4,
      url: 'https://openseauserdata.com/files/22b10da7fb2cafbf2a76898f185e010f.svg',
    },
    {
      id: 5,
      url: 'https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?auto=format&w=384',
    },
  ];

  return (
    <Wrap>
      {profileData?.map((profile, idx) => {
        return (
          <WrapItem key={idx}>
            <div className="flex flex-col items-center space-x-9">
              <Avatar
                className="hover:border-pink-600 hover:border-solid "
                size="lg"
                name="Doodles"
                src={profilePics[idx].url}
              />
              <p className="flex">{profile?.handle}</p>
            </div>
          </WrapItem>
        );
      })}
    </Wrap>
  );
};

export default Stories;
