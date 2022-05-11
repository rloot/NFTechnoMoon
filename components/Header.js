import React from 'react'
import Link from 'next/link'
import { Button } from '@material-ui/core'

const nfaDependencyVersion =
  require('../package.json').dependencies['next-firebase-auth']
const nextDependencyVersion = require('../package.json').dependencies.next
const firebaseDependencyVersion =
  require('../package.json').dependencies.firebase

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
  },
  versionsContainer: {
    marginLeft: 0,
    marginRight: 'auto',
  },
  button: {
    marginLeft: 16,
    cursor: 'pointer',
  },
}

const Header = ({ email, signOut }) => (
  <div style={styles.container}>
    {email ? (
      <>
        <p>{email}</p>
        <Button
          size="small" 
          color="secondary" 
          variant="contained" 
          onClick={() => {
            signOut()
          }}
          style={styles.button}
        >
          Sign out
        </Button>
      </>
    ) : (
      <>
        <p>You are not signed in.</p>
        <Link href="/auth">
          <a>
            <Button size="small" color="secondary" variant="contained" style={styles.button}>
              Sign in
            </Button>
          </a>
        </Link>
      </>
    )}
  </div>
)

export default Header
