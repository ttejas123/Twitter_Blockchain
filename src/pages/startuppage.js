import React, { useState } from 'react';
import Left from './Left';
import Home from './Home';
import Profile from './profile.js'
import User from './User';
import './style.css'

function Alloutes() {
  const [tab, setTab] = useState(0);
  return (<div className='flex justify-center items-center'>
            <div className='w-[75%] flex h-[100vh] bg-red'>
              {/* left */}
              <div className='left w-[30%] bg-green h-full'>
                <Left tab={tab} setTab={setTab} />
              </div>
              {/* right */}
              <div className='right w-[70%] bg-yellow h-full overflow-y-auto scroll-mandatory-here'>
                {
                  tab === 0 && (<Home />)
                }

                {
                  tab === 1 && (<User />)
                }

                {
                  tab === 2 && (<Profile />)
                }
                
              </div>
            </div>
          </div>
  );
}

export default Alloutes;

// 