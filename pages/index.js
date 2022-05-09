import React from 'react'
import {
  useAuthUser,
  withAuthUser,
} from 'next-firebase-auth'
import Header from '../components/Header'
import PageLinks from '../components/PageLinks'
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

  return (
    <div>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <div style={styles.content}>
        <div style={styles.infoTextContainer}>
          <h3>Tehcno Moon NFT</h3>
        </div>
        <PageLinks />
      </div>
    </div>
  )
}

export default withAuthUser()(Demo)
