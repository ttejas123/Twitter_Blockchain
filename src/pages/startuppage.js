import React, { useState } from 'react';
import Left from './Left';
import Home from './Home';
import Profile from './profile.js'
import User from './User';
import Stweet from './Stweet';
import './style.css'

function Alloutes() {
  const [tab, setTab] = useState(0);
  const [tweets, setTweets] = useState([]);
  const [address, setAddress] = useState('');
  return (<div className='flex justify-center items-center'>
            <div className='w-[75%] flex h-[100vh] bg-red'>
              {/* left */}
              <div className='left w-[30%] bg-green h-full'>
                <Left tab={tab} setTab={setTab} />
              </div>
              {/* right */}
              <div className='right w-[70%] bg-yellow h-full overflow-y-auto scroll-mandatory-here'>
                {
                  tab === 0 && (<Home tab={tab} setTab={setTab} setAddress={setAddress} setTweets={setTweets} tweets={tweets} />)
                }

                {
                  tab === 1 && (<User tab={tab} setTab={setTab} setAddress={setAddress} setTweets={setTweets} tweets={tweets} />)
                }

                {
                  tab === 2 && (<Profile tab={tab} setTab={setTab} setAddress={setAddress} setTweets={setTweets} tweets={tweets} />)
                }

                {
                  tab === 3 && (<Stweet address={address} />)
                }
                
              </div>
            </div>
          </div>
  );
}

export default Alloutes;

// 