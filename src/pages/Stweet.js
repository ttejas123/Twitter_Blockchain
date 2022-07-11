import React, { useEffect, useState } from 'react'
import { PublicKey } from '@solana/web3.js'
import useTweets from '../hooks/getTweets'
// import Tweets from './tweets'

const Stweet = ({address}) => {
    const {specificTweet} = useTweets()
    const [data, setdata] = useState({});
    const getdata = async () => {
        const DA = await specificTweet(new PublicKey(address));
        setdata(DA)
    }

    useEffect(() => {
        if(address.length > 0) {
            getdata()
        }

    }, [address])
    return (
        <div className='border-x h-full'>
            <div className='border-b px-9 py-5 hover:bg-gray-100'>
                <div className='flex'><div className='font-bold hover:underline cursor-pointer'>{data.authority_display}</div> <div className='ml-3 text-gray-400'>• {data.created_ago}</div></div>
                <div className='pt-2 text-sm'>{data.content}</div>
            </div>
        </div>
    )
}

export default Stweet