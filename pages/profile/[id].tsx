import axios from 'axios';
import Image from 'next/image';
import React, {useEffect, useState } from 'react';
import { GoVerified } from 'react-icons/go';
import NoResults from '../components/NoResults';
import VideoCard from '../components/VideoCard';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';

interface iProps {
  data :{
    user: IUser;
    userVideos: Video[];
    userLiked: Video[]
  }
}

const Profile = ({data}: iProps) => {
  const { user, userLiked, userVideos } = data
  const [showUserVideos, setShowUserVideos] = useState(true);
  const [videoList, setVideoList] = useState<Video[]>([])
  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400" 
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400" 

  useEffect(() => {
   if(showUserVideos){
    setVideoList(userVideos)
   } else {
    setVideoList(userLiked)
   }
  }, [showUserVideos, userLiked, userVideos])
  
  return (
    <div className='w-full'>
        <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
          <div className="h-16 w-16 md:h-32 md:w-32">
             <Image 
                height={120}
               width={120}
               className="rounded-full"
               src={user.image}
               alt="User Profile"
               fill
             />
            </div>
            <div className='flex flex-col justify-center'>
                <p  className='md:text-2l tracking-wider justify-center flex gap-1 items-center text-md font-bold text-primary lowercase'>
                    {user.userName.replaceAll(" ", "")}
                    <GoVerified  className='text-blue-500'/>
                </p>
                <p className='capitalize md:text-xl text-gray-400 text-xs'>
                      {user.userName}
                </p>
            </div>
        </div>
        <div>
          <div  className="flex gap-10 mb-10 mt-10 bg-white border-b-2 w-full border-gray-300">
              <p onClick={()=>setShowUserVideos(true)} className={`font-semibold cursor-pointer text-xl mt-2 ${videos}`}>
                    Videos
              </p>
              <p onClick={()=>setShowUserVideos(false)} className={`font-semibold cursor-pointer text-xl mt-2 ${liked}`}>
                    Liked
              </p>
          </div>
          <div className="flex flex-wrap gap-6 md:justify-start">
            {videoList?.length > 0 ? (
              videoList?.map((post: Video, idx:number)=> (
                <VideoCard post={post} key={idx} />
              ))): <NoResults text={`No ${showUserVideos ? '' : 'Liked'} Video Yet`}/>
            }
          </div>
        </div>
    </div>
  )
}

export const getServerSideProps =async ({params:id}: { params: {id: string}}) => {
        const res = await axios.get(`${BASE_URL}/api/profile/${id}`)
        return {
          props: {
            data: res.data
          }
        }
}

export default Profile