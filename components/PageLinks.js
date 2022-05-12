import React from 'react'
import Link from 'next/link'
import { Button, Box } from '@material-ui/core'

const styles = {
  content: {
    padding: '4px 32px 32px 32px',
    background: '#eeeeee',
    display: 'inline-block',
  },
  linkAnchor: {
    color: 'teal',
    display: 'block',
    lineHeight: '160%',
  },
}

const PageLinks = () => (
  <>
    <Box padding={2}>
      <Link href="/verify">
        <Button variant="contained" color="secondary">
          Verificar ticket.
        </Button>
      </Link>
    </Box>

    <Box padding={2}>
      <Link href="/view">
        <Button variant="contained" color="secondary">
          View.
        </Button>
      </Link>
    </Box>
  </>
)

PageLinks.displayName = 'PageLinks'

export default PageLinks
