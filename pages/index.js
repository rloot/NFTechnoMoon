import React from 'react'
import {
  useAuthUser,
  withAuthUser,
} from 'next-firebase-auth'
import Header from '../components/Header'
import PageLinks from '../components/PageLinks'
import { Box } from '@material-ui/core'

const styles = {
  content: {
    padding: 32, 
  },
  infoTextContainer: {
    marginBottom: 32,
  },
  component: {
    backgroundColor: '#000'
  }

}

const Index = () => {
  const AuthUser = useAuthUser()

  return (
    <Box style={styles.component}>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <div style={styles.content}>
        <div style={styles.infoTextContainer}>
          <h3>Tehcno Moon NFT</h3>
        </div>
        <PageLinks />
      </div>
    </Box>
  )
}

export default withAuthUser()(Index)
