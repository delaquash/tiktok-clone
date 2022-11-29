import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import axios from 'axios';
import { Video } from '../../types';

interface  iProps {
    postDetails : Video
}

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const Detail = ({ postDetails }: iProps )=> {
  const [post, setPost] = useState(postDetails)
  const [playing, setPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null);

// play and pause functionalities
  const onVideoClick =() => {
    if(playing){
      videoRef?.current?.pause()
      setPlaying(false)
    } else{
      videoRef?.current?.play()
      setPlaying(true)
    }
  }

   // muting the video\
  useEffect(()=> {
    if(videoRef?.current) {
      videoRef.current.muted =isMuted
    } 
  }, [isMuted])
  
  return (
  <div className='flex w-full left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
    <div className="justify-center relative flex-2 w-[1000px] lg:w-9/12 flex items-center bg-black">
        <div className='absolute top-6 left-2 flex lg:left-6 gap-6 z-50'>
            <p>
               <MdOutlineCancel className='text-white text-[35px]'/>
             </p>
        </div>
        <div className='relative'>
          <div className='relative'>
              <div className='lg:h-[100vh] h-[60vh]'>
                  <video 
                      src={post.video.asset.url} 
                      loop
                      ref={videoRef}
                      onClick={onVideoClick}
                      className="h-full cursor-pointer">

                  </video>
              </div>
              {/* play icons */}
              <div className="absolute top-[45%] left-[45%] cursor-pointer">
                {!playing && (
                  <button onClick={onVideoClick}>
                    <BsFillPlayFill
                         className='text-white text-6xl lg:text-8xl'
                    />
                  </button>
                )}
              </div>     
          </div>
          <div className="absolute bottom-5 lg:bottom-10 right-5 cursor-pointer lg:right-10">
                {isMuted ? (
                  <button>
                  <HiVolumeOff 
                  onClick={()=>setIsMuted(false)}
                    className='text-white text-2xl lg:text-4xl'
                  /> 
                </button>
              ): (
                <button>
                  <HiVolumeUp
                    onClick={()=>setIsMuted(true)} 
                    className='text-white text-2xl lg:text-4xl'
                  />
                </button>
                ) }
          </div>
        </div>
  </div>
</div>
  )
}

export const getServerSideProps= async({ params: { id }}: {params: {id: string }}) => {
      const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

      return  {
        props: {
          postDetails: data
        }
      }
    }


export default Detail