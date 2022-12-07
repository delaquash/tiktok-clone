import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { GoVerified } from 'react-icons/go';
import useAuthStore from '../../store/authStore';

import { IUser } from '../../types';

const SuggestedAccount = () => {
  const { fetchAllUsers,allUsers } = useAuthStore()

  useEffect(()=> {
    fetchAllUsers()
  }, [fetchAllUsers]);

  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>
        <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
            Suggested Account
        </p>
        <div>
          {/* slice is to take all the first 6 suggested user account */}
          {allUsers.slice(0, 6).map((user: IUser)=>(
              <Link href={`/profile/${user._id}`} key={user._id}>
                  <div className="flex gap-3 hover:bg-primary rounded font-semibold cursor-pointer p-2">
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
          ))}
        </div>
    </div>
  )
}

export default SuggestedAccount