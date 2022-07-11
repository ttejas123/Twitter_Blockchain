import dayjs from "dayjs"
import * as relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export class Tweet
{
    constructor (publicKey, accountData) {
        this.publicKey = publicKey
        this.authority = accountData.authority
        this.timestamp = accountData.timestamp.toString()
        this.content = accountData.content
    }

    get key () {
        return this.publicKey.toBase58()
    }

    get authority_display () {
        const authority = this.authority.toBase58()
        return authority.slice(0,4) + '..' + authority.slice(-4)
    }

    get created_at () {
        return dayjs.unix(this.timestamp).format('YYYY-MM-DD HH:mm:ss')
    }

    get created_ago () {
        return dayjs.unix(this.timestamp).fromNow()
    }
}
