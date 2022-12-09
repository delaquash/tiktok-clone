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


const Search = ({ videos }: {videos: Video[]}) => {
    const [isAccount, setIsAccount] = useState(false)
    const router = useRouter();
    const  { allUsers } = useAuthStore();
    const { searchTerm }: any = router.query
    const accounts = isAccount ? "border-b-2 border-black" : "text-gray-400" 
    const isVideos = !isAccount ? "border-b-2 border-black" : "text-gray-400" 
    const searchedAccounts = allUsers.filter((user: IUser)=>user.userName.toLowerCase().includes(searchTerm.toLowerCase()));


  return (
    <div className='w-full'>
        <div  className="flex gap-10 mb-10 mt-10 bg-white border-b-2 w-full border-gray-300">
              <p onClick={()=>setIsAccount(true)} className={`font-semibold cursor-pointer text-xl mt-2 ${accounts}`}>
                    Accounts
              </p>
              <p onClick={()=>setIsAccount(false)} className={`font-semibold cursor-pointer text-xl mt-2 ${isVideos}`}>
                    Videos
              </p>
          </div>
          {isAccount ? (
             <div className='md:mt-16'>
                  {searchedAccounts.length > 0 ? (
                      searchedAccounts.map((user: IUser, idx: number)=> (
                        <Link key={idx} href={`/profile/${user._id}`}>
                        <div className=' flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
                          <div>
                            <Image width={50} height={50} className='rounded-full' alt='user-profile' src={user.image}/>
                          </div>
                          <div>
                            <div>
                              <p className='flex gap-1 items-center text-lg font-bold text-primary'>
                                {user.userName} <GoVerified className='text-blue-400' />
                              </p>
                              <p className='capitalize text-gray-400 text-sm'>
                                {user.userName}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                      ))
                  ): <NoResults text={`No video result for ${searchTerm}`} />}
             </div>
          ): <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
                {videos.length ? (
                    videos.map((video: Video, idx) => (
                        <VideoCard post={video} key={idx} />
                    ))
                ): <NoResults text={`No video result for ${searchTerm}`} />}
            </div>}
    </div>
  )
}

export const getServerSideProps =async ({params:searchTerm}: { params: {searchTerm: string}}) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)
    return {
      props: {
        videos: res.data
      }
    }
}

export default Search