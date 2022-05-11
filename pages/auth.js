import React from 'react'
import { withAuthUser, AuthAction } from 'next-firebase-auth'
import FirebaseAuth from '../components/FirebaseAuth'
import { Box } from '@material-ui/core'

const styles = {
  content: {
    padding: `8px 32px`,
    backgroundColor: '#000'
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: 16,
  },
}

const Auth = () => (
  <Box style={styles.content}>
    <h3>Sign in</h3>
    <div style={styles.textContainer}>
    </div>
    <div>
      <FirebaseAuth />
    </div>
  </Box>
)

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth)
