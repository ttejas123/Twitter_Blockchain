import { useEffect } from 'react'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { useWallet } from '@solana/wallet-adapter-react'
import { SOLANA_HOST } from '../utils/const'
import { getProgramInstance } from '../utils/utils'
const anchor = require('@project-serum/anchor')
const utf8 = anchor.utils.bytes.utf8
const { BN, web3 } = anchor
const { SystemProgram } = web3

const defaultAccounts = {
  tokenProgram: TOKEN_PROGRAM_ID,
  clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
  systemProgram: SystemProgram.programId,
}

const useTweetsCreate = () => {
  const wallet = useWallet()
  const connection = new anchor.web3.Connection(SOLANA_HOST)
  const program = getProgramInstance(connection, wallet)
  
  //create one
  const create = async (content) => {
    const tweet = web3.Keypair.generate()
    
    // console.log(wallet.publicKey.toBuffer())
    // let content  = "Well it's not hard but not easy eather :>"; 
        
    const tx = await program.rpc.sendTweet(content, {
      accounts: {
        tweet: tweet.publicKey,
        authority: wallet.publicKey,
        ...defaultAccounts,
      },
      signers: [tweet]
    })

    console.log(tx);
    // setAccount(true);
    
  }

  const updateTweet = async (publicKey, authoritykey, content) => {
    // let content  = "Well it's not hard but not easy eather :>";
    if(authoritykey.toString() == wallet.publicKey.toString()){
      // console.log(content)
      await program.rpc.updateTweet(content, {
        accounts: {
          authority: authoritykey.toString(),
          tweet: publicKey,
        },
      })
    }
  }

  const deleteTweetfrom = async (publicKey, authoritykey) => {
    // let content  = "Well it's not hard but not easy eather :>";
    if(authoritykey.toString() == wallet.publicKey.toString()){
      // console.log(content)
      await program.rpc.deleteTweet({
        accounts: {
          authority: authoritykey.toString(),
          tweet: publicKey,
        },
      })
    }
  }

  return { create, updateTweet, deleteTweetfrom }
}

export default useTweetsCreate
