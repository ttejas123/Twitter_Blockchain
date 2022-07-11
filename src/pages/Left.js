import React from 'react'
import Micon from '../assets/main-icon';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { AiFillHome, AiOutlineTeam, AiOutlineUser } from "react-icons/ai";
import './style.css'

const Left = ({tab, setTab}) => {
  return (
    <div className='w-full px-8 py-14'>
        <Micon />
        <div className='px-3 bg-red mt-5'>
            <div onClick={()=> setTab(0)} className='flex cursor-pointer py-4 text-[19px]'>
                <AiFillHome size={24}  />
                <div className='font-bold ml-3'>Home</div>
            </div>
            <div onClick={()=> setTab(1)} className='flex cursor-pointer py-4 text-[19px]'>
                <AiOutlineTeam size={24}  />
                <div className='font-bold ml-3'>Users</div>
            </div>
            <div onClick={()=> setTab(2)} className='flex cursor-pointer py-4 text-[19px] mb-5'>
                <AiOutlineUser size={24}  />
                <div className='font-bold ml-3'>Profile</div>
            </div>
            <WalletMultiButton />
        </div>
    </div>
  )
}

export default Left