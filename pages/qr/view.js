import React, { useCallback, useEffect, useState } from 'react'
import { useAuthUser, withAuthUser, AuthAction } from 'next-firebase-auth'
import { Box, CircularProgress, Item, Grid } from '@material-ui/core'

import Header from '../../components/Header'
import useQRCodeScan from '../../utils/useQRCodeScan'
import axios from 'axios'
import * as _ from 'lodash'

const styles = {
  content: {
    padding: 32,
    backgroundColor: '#00000'
  },
  infoTextContainer: {
    marginBottom: 12,
  },
  component: {
    backgroundColor: '#000'
  }
}
  
const View = () => {
  const AuthUser = useAuthUser() // the user is guaranteed to be authenticated

  const { startQrCode, decodedQRData } = useQRCodeScan({
    qrcodeMountNodeID: "qrcodemountnode",
  });

  const getNftParametersFromUrl = (ticketUrl) => {
    // http://localhost:3000?contractAddress=0xa&tokenId=0&secret=a
    let url;

    try {
      url = new URL(ticketUrl);
    } catch (e) {
      console.log(e, "not a url")
      return "http://localhost:3000?contractAddress=0xa&tokenId=0&secret=a";  
    }

    const requestedNft = new URLSearchParams(url.search);

    return {
      contractAddress: requestedNft.get('contractAddress'),
      tokenId: requestedNft.get('tokenId'),
      secret: requestedNft.get('secret')
    }
  }

  const [ validationState, setValidationState ] = useState({
    loading: false,
    error: false,
    state: '',
  })

  const getTicketData = async ({contractAddress, tokenId, secret}) => {
    const ticket = await axios.get(getAbsoluteURL('/api/nft'), {
      params: {
        contractAddress,
        tokenId,
        secret
      }
    });

    return ticket;
  }

  const [ timeOut, setShowTimeOut ] = useState(false)

  useEffect(() => {
    // Add logic to add the camera and scan it
    startQrCode();
  }, []);

  useEffect(() => {
    (async ()=> {
      if(!_.isEmpty(decodedQRData.data) && !timeOut) {
        
        setShowTimeOut(true) 
        const interval = setTimeout(async () => { 
          const tokenParameters = getNftParametersFromUrl(decodedQRData.data)

          setValidationState({})
          setShowTimeOut(false) 
        }, 2500);
      
        return (() => {
          clearTimeout(interval)
        });
      }
    })()
  }, [decodedQRData])

  return (
    <Box style={styles.component}>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <div style={styles.content}>
        <div style={styles.infoTextContainer}>
          <h3>Scan QR</h3>
          <p>
            {/* {timeOut ? <CircularProgress /> : ''} */}
          </p>
        </div>
        <div id="qrcodemountnode"></div>
      </div>
    </Box>
  )

}

export default withAuthUser()(View)
