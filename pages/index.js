import React from 'react'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR
} from 'next-firebase-auth'
import Header from '../components/Header'
import DemoPageLinks from '../components/DemoPageLinks'
import getAbsoluteURL from '../utils/getAbsoluteURL'
import axios from 'axios'

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
        tokenId: 'b',
        secret: "a"
      }
    })

    return isTicketUsed
  }

  return (
    <div>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <div style={styles.content}>
        <div style={styles.infoTextContainer}>
          <h3>Home</h3>
          <p>
            This page does not require authentication, so it won't redirect to
            the login page if you are not signed in.
          </p>
          <p>
            If you remove `getServerSideProps` from this page, it will be static
            and load the authed user only on the client side.
          </p>
        </div>
        <DemoPageLinks />
      </div>
      <button onClick={validateTicket}>NFT AUTH</button>
    </div>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser()(Demo)
