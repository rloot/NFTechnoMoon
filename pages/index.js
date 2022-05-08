import React from 'react'
import {
  useAuthUser,
  withAuthUser,
} from 'next-firebase-auth'
import Header from '../components/Header'
import DemoPageLinks from '../components/DemoPageLinks'
import getAbsoluteURL from '../utils/getAbsoluteURL'

const styles = {
  content: {
    padding: 32, 
  },
  infoTextContainer: {
    marginBottom: 32,
  },
}

const Demo = () => {
  const AuthUser = useAuthUser()

  const validateTicket = async () => {
    const token = await AuthUser.getIdToken()
    const isTicketUsed = await axios.get(getAbsoluteURL('/api/nft'), {
      auth: {
        Authorization: token,
      },
      params: {
        contractAddress: "0xa",
        tokenId: '43',
        secret: "a"
      }
    })
    console.log(isTicketUsed)
    return isTicketUsed
  }

  return (
    <div>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <div style={styles.content}>
        <div style={styles.infoTextContainer}>
          <h3>Tehcno Moon NFT</h3>
        </div>
        <DemoPageLinks />
      </div>
    </div>
  )
}

export default withAuthUser()(Demo)
