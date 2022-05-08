import React from 'react'
import Link from 'next/link'

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
  <div style={styles.content}>
    <div>
      <Link href="/verify">
        <a style={styles.linkAnchor}>
          Verificar ticket.
        </a>
      </Link>
      <Link href="/auth">
        <a style={styles.linkAnchor}>Log in</a>
      </Link>
    </div>
  </div>
)

PageLinks.displayName = 'PageLinks'

export default PageLinks
