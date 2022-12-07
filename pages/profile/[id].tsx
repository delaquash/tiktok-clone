import axios, { Axios } from 'axios';
import Image from 'next/image';
import React, {useEffect, useState } from 'react';
import { GoVerified } from 'react-icons/go';
import NoResults from '../components/NoResults';
import VideoCard from '../components/VideoCard';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';


const profile = () => {
  return (
    <div>profile</div>
  )
}

export const getServerSideProps =async ({params:id}: { params: {id: string}}) => {
        const res = await axios.get(`${BASE_URL}/profile/${id}`)
        return {
          props: {
            data: res.data
          }
        }
}

export default profile