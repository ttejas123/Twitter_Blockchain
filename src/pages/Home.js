import { useWallet } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react'
import getTweets from '../hooks/getTweets'
import useTweetsCreate from '../hooks/sendTweets';
import Tweets from './tweets';

const Home = (props) => {
  const [tweets, setTweets] = useState([]);
  const [tweetData ,setTweetData] = useState('');
  const {allTweets, specificTweet} = getTweets();
  const {create, updateTweet, deleteTweetfrom}  = useTweetsCreate();
  const wallet = useWallet();
  const getAllTweets = async () => {
    const result = await allTweets();
    setTweets(result);
  }

  useEffect(() => {
    
    const intervalId = setInterval(() => {
        if (wallet.connected) {
            getAllTweets()
        }
        // getTiktoks();
        // console.log(tiktoks);
      }, 2000)
      
      // clear interval on re-render to avoid memory leaks
      return () => clearInterval(intervalId)
  }, [])

  return (
    <div className='w-full h-full border-x'>
        {/* Title */}
        <div className='py-4 px-8 font-bold text-[20px] border-b'>Home</div>
        {/* Take Tweets */}
        <div className='py-5 border-b px-5 flex flex-col'>
            <input className='text-[20px] border-none p-1 border-none focus:ring-0 focus:outline-none' onChange={(e) => setTweetData(e.target.value)} value={tweetData} placeholder="What's happening?" />
            <div className='flex justify-end pt-2 px-2'><div  onClick={async () => {
                await create(tweetData)
                setTweetData('')
            }} className='bg-pink-600 cursor-pointer px-7 text-white font-bold py-2 rounded-3xl'>Tweet</div></div>
        </div>
        {/* Read Tweets */}
        <div>
            {
                tweets.map((val, index) =>  {
                    // console.log(val)
                    return (
                        <Tweets val={val} key={index} setAddress={props.setAddress} setTab={props.setTab} setTweets={props.setTweets} tweets={props.tweets} updateTweet={updateTweet} deleteTweetfrom={deleteTweetfrom} />
                    )
                })
            }
        </div>
    </div>
  )
}

export default Home