import Image from 'next/image';
import Link from 'next/link';
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { GoVerified } from 'react-icons/go';
import useAuthStore from '../../store/authStore';
import NoResults from './NoResults';
import { IUser } from '../../types';

interface iProps {
  isPostingComment : Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: isComment[];

}
interface isComment {
  comment: string;
  length?:number;
  _key: string;
  postedBy: { _ref: string; _id: string}
}

const Comment = ({comment, setComment, addComment, comments, isPostingComment }: iProps) => {
  // const [, setIsPostingComment] = useState(false)
  const { userProfile, allUsers } = useAuthStore()
  
  return (
    <div className='pt-4 px-10 border-gray-200, border-t-2 border-b-2 lg:pb-0 pb-[100px] bg-[#F8F8F8]'>
      <div className="overflow-scroll lg:h-[475vh]">
        {comments?.length ? (
          comments.map((items, idx)=> (
            <>
            {allUsers.map((user: IUser)=>(
              user._id === (items.postedBy._id || items.postedBy._ref) && (
                <div className="p-2 items-center" key={idx}>
                    <Link href={`/profile/${user._id}`}>
                      <div className="flex items-center gap-3">
                         <div className="h-8 w-8">
                            <Image 
                              height={34}
                              width={34}
                              className="rounded-full"
                              src={user.image}
                              alt="User Profile"
                              fill
                            />
                          </div>
                          <div className="hidden xl:block">
                              <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                                  {user.userName.replaceAll(" ", "")}
                                  <GoVerified  className='text-blue-500'/>
                              </p>
                              <p className='capitalize text-gray-400 text-xs'>
                                {user.userName}
                              </p>
                          </div>
                        </div>
                      </Link>
                      <div>
                        <p>{items.comment}</p>
                      </div>
                </div>
              )))}
            </>
          ))
        ): <NoResults  text='No comment yet.'/>}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
          <form onSubmit={addComment} className="flex gap-4">
              <input
                  value={comment}
                  onChange={(e)=>setComment(e.target.value)}
                  placeholder="Add Comment...."
                  className='bg-primary px-6 py-4 text-md border-gray-100 focus:outline-none flex-1 rounded-lg
                    font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] focus:border-2 focus:border-gray-300'
              />
              <button onClick={addComment} className="text-md text-gray-400">
                  {isPostingComment ? "Commenting..." : "Comment"}
              </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Comment;