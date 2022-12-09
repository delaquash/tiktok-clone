import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { GoVerified } from 'react-icons/go';
import { BASE_URL } from '../../utils';
import NoResults from '../components/NoResults';
import VideoCard from '../components/VideoCard';
import { IUser, Video } from '../../types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuthStore from '../../store/authStore';

const Search = () => {
  return (
    <div>Search</div>
  )
}

export const getServerSideProps =async ({params:searchTerm}: { params: {searchTerm: string}}) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)
    return {
      props: {
        data: res.data
      }
    }
}

export default Search