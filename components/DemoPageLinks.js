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

const DemoPageLinks = () => (
  <div style={styles.content}>
    <div>
      <Link href="/staticAuth">
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

DemoPageLinks.displayName = 'DemoPageLinks'

export default DemoPageLinks
