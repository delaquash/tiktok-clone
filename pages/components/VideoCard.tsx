import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef} from 'react';
import { Video } from '../../types';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPauseFill, BsFillPlayFill, BsPlay } from 'react-icons/bs';
import {GoVerified} from "react-icons/go";


interface VCProps {
  post: Video
}

const VideoCard = ({post} : VCProps) => {
  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);


  // play and pause functionalities
  const onVideoPres = () => {
    if(isPlaying){
      videoRef?.current?.pause();
      setIsPlaying(false)
    } else {
      videoRef?.current?.play();
      setIsPlaying(true)
    };
  };

  // muting the video\
  useEffect(()=> {
    if(videoRef?.current) {
      videoRef.current.muted =isMuted
    } 
  }, [isMuted])

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
        <div className='md:w-16 md:h-16 w-10 h-10'>
          <Link href="/">
            <>
              <Image
                width={62}
                height={62}
                className="rounded-full"
                src={post.postedBy.image}
                alt="Video posted on app"
              />
            </>
          </Link>
        </div>
        <Link href='/'>
          <div className='flex gap-2 items-center'>
              <p className='flex items-center gap-2 md:text-md font-bold text-primary'>
                {post.postedBy.userName}{``}
                  <GoVerified 
                      className='text-blue-400 text-md'
                  />
              </p>
              <p className='capitalize font-medium text-xs text-gray-500 
              hidden md:block'>
                {post.postedBy.userName}
              </p>
          </div>  
        </Link>    
      </div>
      <div className='lg:ml-20 flex gap-d relative'>
          <div 
            className='rounded-3xl'
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={()=> setIsHover(false)}
          >
                <Link href={`/pages/detail/${post._id}`}>
                    <video
                        loop
                        ref={videoRef}
                        className='lg:w-[600px] h-[300px] md:h-[400px] 
                        lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'
                        src={post.video.asset.url}
                    >
                      </video>
                </Link>
                {isHover && (
                  <div className='absolute bottom-6 cursor-pointer w-[100px] md:w-[50px] 
                      md:left-14 lg:left-0 flex gap-10 lg:justify-between left-8 p-3
                  '>
                      {isPlaying ? (
                        <button onClick={onVideoPres}>
                          <BsFillPauseFill 
                            className='text-black text-2xl lg:text-4xl'
                          /> 
                        </button>
                      ): (
                        <button onClick={onVideoPres}>
                          <BsFillPlayFill 
                              className='text-black text-2xl lg:text-4xl'
                          />
                        </button>
                      )};
                      {isMuted ? (
                        <button>
                          <HiVolumeOff 
                          onClick={()=>setIsMuted(false)}
                            className='text-black text-2xl lg:text-4xl'
                          /> 
                        </button>
                      ): (
                        <button>
                          <HiVolumeUp
                              onClick={()=>setIsMuted(true)} 
                              className='text-black text-2xl lg:text-4xl'
                          />
                        </button>
                      )}
                  </div>
                )}
          </div>
      </div>
    </div>
  );
};

export default VideoCard