import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import { AiFillHome } from "react-icons/ai";
import Logo from '../../utils/tiktik-logo.png';


const Navbar = () => {
    const user = false;
  return (
    <div className='w-full flex justify-between items-center 
        border-b-2 border-gray-200  py-2 px-4'>
        <Link href="/">
            <div className='w-[100px] md:w-[130px]'>
                <Image
                    src={Logo}
                    alt="Logo"
                    className='cursor-pointer'
                />
            </div> 
        </Link>
        <div>
            Search
        </div>
        <div>
          {user ? <div>
            Login
          </div> : (
            <GoogleLogin 
              onSuccess={(response)=>console.log(response)}
              onError={()=>console.log('Error')}
            />
          )}
        </div>
    </div>
  )
};

export default Navbar;