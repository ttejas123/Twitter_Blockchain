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
    const randomKey = anchor.web3.Keypair.generate().publicKey;
    let [tweet_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode("tweet")],
      program.programId,
    )

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

  //read all
  const allTweets = async () => {
    const tx = await program.account.tweet.all();
    // console.log(tx);
    // setAccount(true);
    return tx;
  }

  //read one
  const specificAccounts = async () => {
    let [user_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode('user'), wallet.publicKey.toBuffer()],
      program.programId,
    )

    try {
      const userInfo = await program.account.userAccount.fetch(user_pda)
      console.log(userInfo)
    } catch (e) {
      
    }   
  }

  //update Account
  const updateAccount = async () => {
    let [user_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode('user'), wallet.publicKey.toBuffer()],
      program.programId,
    )

    let profileAA = "https://picsum.photos/200/300"
    let name = "Updated Tejas"

    const tx = await program.rpc.updateUser(name, profileAA, {
      accounts: {
        user: user_pda,
        authority: wallet.publicKey,
        ...defaultAccounts,
      },
    })

    console.log(tx);
  }



  return { create, allTweets, specificAccounts, updateAccount }
}

export default useTweetsCreate
