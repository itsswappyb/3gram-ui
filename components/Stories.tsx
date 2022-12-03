import {Avatar, Wrap, WrapItem} from '@chakra-ui/react';
import React from 'react';

const Stories = () => {
  return (
    <Wrap>
      <WrapItem>
        <Avatar
          className="hover:border-pink-600 hover:border-solid "
          size="lg"
          name="Doodles"
          src="https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?auto=format&w=384"
        />
      </WrapItem>
      <WrapItem>
        <Avatar
          className="hover:border-pink-600 hover:border-solid "
          size="lg"
          name="BAYC"
          src="https://img.seadn.io/files/eb92fda9bbe894cd108bfbf9bdc97b43.png?auto=format&fit=max&w=750"
        />{' '}
      </WrapItem>
      <WrapItem>
        <Avatar
          className="hover:border-pink-600 hover:border-solid "
          size="lg"
          name="WOW"
          src="https://img.seadn.io/files/62e378fd2586bcc0447be3ba12844012.png?auto=format&fit=max&w=750"
        />{' '}
      </WrapItem>
      <WrapItem>
        <Avatar
          className="hover:border-pink-600 hover:border-solid  "
          size="lg"
          name="DFC"
          src="https://openseauserdata.com/files/22b10da7fb2cafbf2a76898f185e010f.svg"
        />{' '}
      </WrapItem>
      <WrapItem>
        <Avatar
          className="hover:border-pink-600 hover:border-solid "
          size="lg"
          name="Nouns"
          src="https://openseauserdata.com/files/f960605431343a1637e977510172285d.svg"
        />{' '}
      </WrapItem>
      <WrapItem>
        <Avatar
          className="hover:border-pink-600 hover:border-solid "
          size="lg"
          name="Bufficorn"
          src="https://i.seadn.io/gae/9YnSuUHzG_vQPisdLoTKu7fJA99p9q_YMo_oDDtSUwbLXMJkNcXvRbf2zN9inNaSK3-4LMHaFc0QhFUDUDx_cN1PYya8w9joX_xv?auto=format&w=750"
        />{' '}
      </WrapItem>
    </Wrap>
  );
};

export default Stories;
