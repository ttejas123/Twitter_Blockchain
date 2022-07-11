import React from 'react';
import { useWallet } from "@solana/wallet-adapter-react"
import ConnectWalletPage from './pages/ConnectWallet.js'
import Startup from './pages/startuppage.js'
function Alloutes() {
  const {connected} = useWallet();
  // console.log(connected)
  return (
        <div>
            {connected ? (<Startup />) : (<ConnectWalletPage />)}
        </div>
  );
}

export default Alloutes;