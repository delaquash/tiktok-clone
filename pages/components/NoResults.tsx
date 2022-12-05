import React from 'react';
import { Video } from '../../types';
import { NextPage } from 'next';
import { MdOutlineVideocamOff } from 'react-icons/md';
import { BiCommentX } from 'react-icons/bi';


interface iProps {
  text: string
}

const NoResults = ({text}: iProps) => {
  return (
    <div className='flex flex-col h-full w-full justify-center items-center '>
      <p className="text-8xl">
        {text === "No comment yet."? <BiCommentX /> : <MdOutlineVideocamOff />}
      </p>
    </div>
  )
}

export default NoResults