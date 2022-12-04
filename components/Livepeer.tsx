import {Player} from '@livepeer/react';
import Image from 'next/image';
import * as React from 'react';

import rickRollPoster from '../public/images/rick.jpeg';

const PosterImage = () => {
  return (
    <Image
      src={rickRollPoster}
      layout="fill"
      objectFit="cover"
      priority
      placeholder="blur"
      alt="waterfall"
    />
  );
};

const playbackId =
  'bafybeigtqixg4ywcem3p6sitz55wy6xvnr565s6kuwhznpwjices3mmxoe';

export function Livepeer() {
  return (
    <Player
      title="Waterfalls"
      playbackId={playbackId}
      loop
      autoPlay
      showTitle={false}
      muted
      poster={<PosterImage />}
    />
  );
}
