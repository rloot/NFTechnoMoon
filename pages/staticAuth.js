import React, { useCallback, useEffect, useState } from 'react'
import { useAuthUser, withAuthUser, AuthAction } from 'next-firebase-auth'
import Header from '../components/Header'
import DemoPageLinks from '../components/DemoPageLinks'
import FullPageLoader from '../components/FullPageLoader'
import getAbsoluteURL from '../utils/getAbsoluteURL'
import useQRCodeScan from '../utils/useQRCodeScan'
import axios from 'axios'
import * as _ from 'lodash'

const styles = {
  content: {
    padding: 32,
  },
  infoTextContainer: {
    marginBottom: 32,
  },
}

const Demo = () => {
  const { startQrCode, decodedQRData } = useQRCodeScan({
    qrcodeMountNodeID: "qrcodemountnode",
  });
  
  useEffect(() => {
    // Add logic to add the camera and scan it
    startQrCode();
  }, []);

  useEffect(() => {
    if(!_.isEmpty(decodedQRData.data)) {
      alert(decodedQRData.data)
    }

  }, [decodedQRData])

  const AuthUser = useAuthUser() // the user is guaranteed to be authenticated
  const token = AuthUser.getIdToken()

  const validateTicket = async () => {
    const isTicketUsed = await axios.get(getAbsoluteURL('/api/nft'), {
      auth: {
        Authorization: token,
      },
      params: {
        contractAddress: "0xa",
        tokenId: '40',
        secret: "a"
      }
    })
    console.log(isTicketUsed)
    return isTicketUsed
  }

  return (
    <div>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <div style={styles.content}>
        <div style={styles.infoTextContainer}>
          <h3>Scan QR code</h3>
          <p>
            This page requires is static but requires authentication.
          </p>
        </div>
        {/* <DemoPageLinks /> */}
        <div id="qrcodemountnode"></div>

        <button onClick={validateTicket}>NFT API</button>
      </div>
    </div>
  )
}

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: FullPageLoader,
})(Demo)
