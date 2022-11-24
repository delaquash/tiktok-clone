import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { SanityAssetDocument } from '@sanity/client';
import { client } from '../utils/clients';
import useAuthStore from '../store/authStore';


const Upload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
    const [wrongFileType, setWrongFileType ] = useState(false);

    const uploadFile =async (e: any)=> {
        const selectedFile = e.target.files[0]
        const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

        if(fileTypes.includes(selectedFile.types)){
            client.assets.upload('file', selectedFile, {
                contentType: selectedFile.type,
                filename: selectedFile.name
            })
            .then((data)=> {
                setVideoAsset(data)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
            setWrongFileType(true)
        }
    }

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
                                <video
                                    src={videoAsset.url}
                                    loop
                                    controls
                                    className="rounded-xl h-[450px]
                                    mt-10 bg-black"
                                >

                                </video>
                            </div>
                        ):(
                            <label className="cursor-pointer">
                                <div className='flex flex-col items-center justify-center h-full'>
                                    <div className="flex flex-col items-center justify-center">
                                        <p className='font-bold text-xl'>
                                            <FaCloudUploadAlt className='text-gray-300 text-6xl'/>
                                        </p>
                                        <p className='text-xl font-semibold'>
                                            Select Video to Upload
                                        </p>
                                    </div>
                                    <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                                        MP4 or WebM or ogg <br />
                                        720X1280 or higher <br />
                                        Upto to 10minutes <br />
                                        Less than 2GB
                                    </p>
                                    <p className='bg-[#F51997] text-center mt-10 rounded 
                                        p-2 w-52 outline-none text-white text-md font-medium'>
                                            Select File
                                    </p>
                                </div>
                                    <input 
                                        name='upload-video'
                                        type='file'
                                        onChange={uploadFile}
                                        className="w-0 h-0"
                                    />
                            </label>
                            )}
                        </div>
                     )}
                     {wrongFileType &&  (
                        <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[250px]'>
                            Please select a video file
                        </p>
                     )}
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Upload;