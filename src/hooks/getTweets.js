import { useWallet } from '@solana/wallet-adapter-react'
import { SOLANA_HOST, TWEETER_PROGRAM_ID } from '../utils/const'
import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { getProgramInstance } from '../utils/utils'
import { Tweet } from './tweet';
const anchor = require('@project-serum/anchor')
const { BN, web3 } = anchor
// const { SystemProgram } = web3
const utf8 = anchor.utils.bytes.utf8

const useTweets = () => {
  const wallet = useWallet()
  const connection = new anchor.web3.Connection(SOLANA_HOST)
  const program = getProgramInstance(connection, wallet)

  //read all
  const allTweets = async () => {
    const tx = await program.account.tweet.all();
    const newTweetsVar =  tx.map(tweet => new Tweet(tweet.publicKey, tweet.account))
    // setTweets(newTweetsVar);
    return newTweetsVar;
  }

  //read one
  const specificAccountTweet = async (pubkeyGiven = wallet.publicKey.toBase58()) => {    
        // const tweetClient = program.account.tweet
        // const tweetAccountName = tweetClient._idlAccount.name
        // const tweetDiscriminatorFilter = {
        //     memcmp: tweetClient.coder.accounts.memcmp(tweetAccountName)
        // }

        // console.log(wallet.publicKey.toBase58())
        const dilterdata = {
            memcmp: {
                offset: 8, // Discriminator.
                bytes: pubkeyGiven,
            }
        }
        
        // Prefetch all tweets with their timestamps only.        
        const tweets = await program.account.tweet.all([dilterdata]);
        const newTweetsVar =  tweets.map(tweet => new Tweet(tweet.publicKey, tweet.account))
        console.log(tweets)
        return newTweetsVar;
        // return allTweetsWithTimestamps
        //     .sort((a, b) => b.timestamp.cmp(a.timestamp))
        //     .map(({ pubkey }) => pubkey)
  }

  const tweetsFromSpecificuser = async (address) => {
    let [user_pda] = await anchor.web3.PublicKey.findProgramAddress(
        [utf8.encode('tweet'), wallet.publicKey.toBuffer()],
        program.programId,
    )
    const tweets = await program.account.tweet.fetchMultiple(user_pda)
    console.log(user_pda);
  }
  
  return { allTweets, specificAccountTweet, tweetsFromSpecificuser }
}

export default useTweets
