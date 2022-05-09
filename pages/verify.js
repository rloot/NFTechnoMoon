import React, { useCallback, useEffect, useState } from 'react'
import { useAuthUser, withAuthUser, AuthAction } from 'next-firebase-auth'
import Header from '../components/Header'
import PageLinks from '../components/PageLinks'
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
  const AuthUser = useAuthUser() // the user is guaranteed to be authenticated
  const token = AuthUser.getIdToken()

  const { startQrCode, decodedQRData } = useQRCodeScan({
    qrcodeMountNodeID: "qrcodemountnode",
  });

  const getNftParametersFromUrl = (ticketUrl) => {
    // http://localhost:3000?contractAddress=0xa&tokenId=0&secret=a
    const url = new URL(ticketUrl);
    const requestedNft = new URLSearchParams(url.search);

    return {
      contractAddress: requestedNft.get('contractAddress'),
      tokenId: requestedNft.get('tokenId'),
      secret: requestedNft.get('secret')
    }
  }

  const validateTicket = async ({contractAddress, tokenId, secret}) => {
    const validation = await axios.get(getAbsoluteURL('/api/nft'), {
      auth: {
        Authorization: token,
      },
      params: {
        contractAddress,
        tokenId,
        secret
      }
    })

    // alert(validation.data.state)
    return validation
  }

  const [ validationState, setValidationState ] = useState({
    loading: false,
    error: false,
    state: '',
  })

  useEffect(() => {
    // Add logic to add the camera and scan it
    startQrCode();
  }, []);

  useEffect(() => {
    (async ()=> {
      if(!_.isEmpty(decodedQRData.data)) {
        const tokenParameters = getNftParametersFromUrl(decodedQRData.data)

        setValidationState({...validationState, loading: true})
        
        const validationResponse = await validateTicket(tokenParameters)
        const validationState = _.get(validationResponse, 'data.state', 'no_data')

        setValidationState({...validationState, loading: false, state: validationState})

        console.log(decodedQRData)
      }
    })()

  }, [decodedQRData])
  




  return (
    <div>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <div style={styles.content}>
        <div style={styles.infoTextContainer}>
          <h3>Scan QR code</h3>
          <p>
            This page requires authentication.
            STATE: {validationState.state}
          </p>
        </div>
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
