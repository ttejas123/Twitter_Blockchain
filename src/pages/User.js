import { useWallet } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react'
import getTweets from '../hooks/getTweets'
import useTweetsCreate from '../hooks/sendTweets';
const User = (props) => {
  // const [tweets, setTweets] = useState([]);
  const [tweetData ,setTweetData] = useState('');
  const { specificAccountTweet } = getTweets();
  const {updateTweet}  = useTweetsCreate();
  const wallet = useWallet();
  const getAllTweets = async (pubKeyEntered) => {
    const result = await specificAccountTweet(pubKeyEntered);
    props.setTweets(result);
  }
  return (
    <div className='w-full h-full border-x'>
        {/* Title */}
        <div className='py-4 px-8 font-bold text-[20px] border-b'>Users</div>

        {/* Take Tweets */}
        <div className='py-5 border-b px-5 flex '>
            <input className='w-[70%] text-[20px] border-none p-1 border-none focus:ring-0 focus:outline-none' onChange={(e) => setTweetData(e.target.value)} value={tweetData} placeholder="Public Key?" />
            <div className=' w-[25%] flex pt-2 px-2'><div  onClick={async () => {
                await getAllTweets(tweetData)
                // setTweetData('')
            }} className='bg-pink-600 cursor-pointer px-7 text-white font-bold py-2 rounded-3xl'>Search</div></div>
        </div>
        {/* Read Tweets */}
        <div>
            {
                props.tweets.map((val, index) =>  {
                    // console.log(val)
                    return (
                        <div key={index} className='border-b px-9 py-5 hover:bg-gray-100' onClick={()=> updateTweet(val.key, val.authority, `Update Content ${Date.now()}`)}>
                            <div className='flex'><div className='font-bold'>{val.authority_display}</div> <div className='ml-3 text-gray-400'>• {val.created_ago}</div></div>
                            <div className='pt-2 text-sm'>{val.content}</div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default User