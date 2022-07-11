import React, {useState} from 'react'
import getTweets from '../hooks/getTweets'
import dayjs from "dayjs"
import * as relativeTime from 'dayjs/plugin/relativeTime';
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai'
dayjs.extend(relativeTime);
// import sendTweet from '../hooks/sendTweets';

const Tweets = (props) => {
  const { specificAccountTweet } = getTweets();
  const [tweetData ,setTweetData] = useState('');
  const [update, setUpate] = useState(false);
  // const { deleteTweet } = sendTweet;
  return (
    <div className='border-b px-9 py-5 hover:bg-gray-100'>
        <div className='flex justify-between items-center'>
            <div className='flex'><div className='font-bold hover:underline cursor-pointer' onClick={ async ()=> {
                  // console.log(props.val.key)
                  const datawegetFromUser = await specificAccountTweet(props.val.authority.toString())
                  props.setTweets(datawegetFromUser)
                  props.setTab(1)
              }}>{props.val.authority_display}</div> <div className='ml-3 text-gray-400 hover:underline cursor-pointer' onClick={()=>  {
                  props.setAddress(props.val.publicKey.toString())
                  props.setTab(3)
              }}>• {props.val.created_ago}</div></div>
            <div className='flex'>
                <div className='opacity-30 hover:opacity-70 p-3 cursor-pointer hover:bg-gray-200 rounded-full' onClick={async ()=> {
                      setUpate(!update)
                      setTweetData(props.val.content)
                    }}><AiOutlineEdit /></div>
                <div className='opacity-30 hover:opacity-70 p-3 cursor-pointer hover:bg-gray-200 rounded-full' onClick={async ()=> {
                      await props.deleteTweetfrom(props.val.key, props.val.authority)
                    }}><AiOutlineDelete /></div>
            </div>
        </div>
        <>
           {
              update ? (
                <div className='pb-2 pt-5 px-5 flex flex-col'>
                    <input className='text-[20px]  p-1 focus:ring-0 focus:outline-none' onChange={(e) => setTweetData(e.target.value)} value={tweetData} placeholder="Update Tweet?" />
                    <div className='flex justify-end pt-2 px-2'><div  onClick={async () => {
                        // await create(tweetData)
                        await props.updateTweet(props.val.key, props.val.authority, tweetData)
                        setTweetData('')
                        setUpate(!update)
                    }} className='bg-pink-600 cursor-pointer px-7 text-white font-bold py-2 rounded-3xl'>Update</div></div>
                </div>
              ) : (
                <div className='pt-2 text-sm' onClick={()=> props.updateTweet(props.val.key, props.val.authority, `Update Text in ${dayjs()}`)}>{props.val.content}</div>
              )
           } 
        </>
    </div>
  )
}

export default Tweets