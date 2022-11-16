import React, {useState} from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GoogleLogin }  from 'react-google-login';
import { ImCancelCircle } from 'react-icons/im';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import Discover from './Discover';
import SuggestedAccount from './SuggestedAccount';
import Footer from './Footer';


const Sidebar = () => {
    const [showSideBar, setShowSideBar] = useState(true)
    const userProfile = false
    const normalink = "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded";
  return (
    <div>
        <div 
            className='block xl:hidden m-2 ml-4 mt-3 text-xl'
            onClick={()=>setShowSideBar((prev)=>!prev)}
        > 
        {showSideBar ? <ImCancelCircle/> :<AiOutlineMenu/> }
        </div>
            {showSideBar && (
                <div>
                    <div className='xl:w-400 w-20 flex flex-col justify-start
                        mb-10 border-r-2 border-gray-200 xl:border-0 p-3'>  
                            <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
                                <Link href='/'>
                                    <div className={normalink}>
                                        <p className="text-2xl">
                                            <AiFillHome />
                                        </p>
                                        <span className='text-xl hidden xl:block'>
                                            For you
                                        </span>
                                    </div>
                                </Link>
                            </div> 
                            {!userProfile && (
                                <div className='px-2 py-4 hidden xl:block'>
                                    <p className='text-gray-400'>
                                        Login in to like and comment on videos
                                    </p>
                                    <div className="pr-4">
                                        <GoogleLogin
                                            clientId=''
                                            render={renderProps=> (
                                                <button
                                                    className='bg-white text-lg mt-3 w-fulloutline-none hover:text-white w-full
                                                    text-[#f51997] border-[1px] px-3 py-6 font-semibold rounded-3xl hover:bg-[#F51997]'
                                                    disabled={renderProps.disabled}
                                                    onClick={renderProps.onClick}
                                                >
                                                    Log in
                                                </button>
                                            )}
                                            onSuccess={()=>{}}
                                            onFailure={()=> {}}
                                            cookiePolicy="single_host_origin"
                                        />
                                    </div>
                                </div>
                            )}
                            <Discover />
                            <SuggestedAccount />
                            <Footer />
                    </div> 
                </div>    
            )}
        </div>
  )
}

export default Sidebar