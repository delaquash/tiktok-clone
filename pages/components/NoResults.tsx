import React from 'react';
import { Video } from '../../types';
import { NextPage } from 'next';


interface NRProps {
  text: string
}

const NoResults: NextPage<NRProps> = ({text}) => {
  return (
    <div>NoResults</div>
  )
}

export default NoResults