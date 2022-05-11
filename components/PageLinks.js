import React from 'react'
import Link from 'next/link'
import { Button } from '@material-ui/core'

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
  <div>
    <Link href="/verify">
      <Button variant="contained" color="secondary">
        Verificar ticket.
      </Button>
    </Link>
  </div>
)

PageLinks.displayName = 'PageLinks'

export default PageLinks
