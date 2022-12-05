import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { MdFavorite } from 'react-icons/md';
import useAuthStore from '../../store/authStore';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

interface iProps {
  handleLike: () => void
  handleDisLike: () => void
  likes: any[]
}
const LikeButton = ({likes, handleLike, handleDisLike} : iProps) => {
  const [isAlreadyLiked, setIsAlreadyLiked] = useState(false)
  const { userProfile }: any = useAuthStore();
  const filterLikes = likes?.filter((item)=> item._ref === userProfile?._id)

 useEffect(() => {
    {filterLikes.length > 0 ? setIsAlreadyLiked(true) : setIsAlreadyLiked(false)}
 }, [filterLikes, likes])
  // if(!post) return null;
  return (
    <div className='flex gap-6'>
        <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
           {isAlreadyLiked ? (
              <div className='bg-primary rounded-full p-2 md:p-4  text-[#f51997] onClick={handleDislike}'>
                  <MdFavorite className='text-lg md:text-2xl'/>
              </div>
           ):(
            <div className='bg-primary rounded-full p-2 md:p-4  text-[#f51997] onClick={handleLike}'>
              <MdFavorite className='text-lg md:text-2xl'/>
            </div>
           )}
           <p className='text-md font-semibold'>
              {likes?.length | 0}
           </p>
        </div>
    </div>
  )
}

export default LikeButton