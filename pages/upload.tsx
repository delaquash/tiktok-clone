import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';

import { client } from '../utils/clients';
import useAuthStore from '../store/authStore';



const Upload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [videoAsset, setVideoAsset] = useState(null);
  return (
    <div className='flex w-full h-full'>
        <div className='bg-white rounded-lg'>
            <div>
                <div>
                    <p className='text-2xl font-bold'>Upload Videos</p>
                    <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>
                </div>
                <div className='border-dashed rounded-xl flex flex-col border-4 border-gray-400 hover:border-red-300
                justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:bg-gray-200'>
                    {isLoading ? 
                    (<p>
                       Uploading.... 
                    </p>):(
                        <div>
                        {videoAsset ? (
                            <div>
                                Hello
                            </div>
                        ):(
                            <label className="cursor-pointer">
                            <div className='flex flex-col items-center justify-center h-full'>
                            <div className="flex flex-col items-center justify-center">
                                <p className='font-bold text-xl'>
                                    <FaCloudUploadAlt className='text-gray-300 text-6xl'/>
                                </p>
                                <p className='text-xl font-semibold'>Select Video to Upload</p>
                            </div>
                            </div>
                            </label>)}
                            </div>
                     )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Upload;