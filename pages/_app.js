import React from 'react'
import '../styles/globals.css'
import initAuth from '../utils/initAuth'

import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';

initAuth()

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Techno NFT</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    </Head>
    <CssBaseline />
    <Component {...pageProps} />
  </> 
)

export default MyApp
