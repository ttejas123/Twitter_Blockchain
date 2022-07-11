import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import tweeter from './tweeter_clone.json';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"

const NETWORK_MAIN = WalletAdapterNetwork.Devnet;
export const NETWORK = NETWORK_MAIN;

export const CLUSTER ="devnet";
export const SOLANA_HOST = clusterApiUrl(NETWORK_MAIN);
// export const SOLANA_HOST = clusterApiUrl("devnet")

export const TWEETER_PROGRAM_ID = new PublicKey('7DWfeSn5K7k71b5TYRgPBjSKWMh8CKbnZdwZR5Ekrkkc');


export const TWEETER_IDL = tweeter;