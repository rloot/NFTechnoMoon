import React, { useCallback, useEffect, useState } from 'react'
import { useAuthUser, withAuthUser, AuthAction } from 'next-firebase-auth'

import { Box, CircularProgress, Item, Grid } from '@material-ui/core'
import { DoneOutlineOutlined } from '@mui/icons-material'
import { Error } from '@mui/icons-material'

import Header from '../../components/Header'
import FullPageLoader from '../../components/FullPageLoader'
import getAbsoluteURL from '../../utils/getAbsoluteURL'
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

const Demo = () => {
  const AuthUser = useAuthUser() // the user is guaranteed to be authenticated
  const token = AuthUser.getIdToken()

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
    state: 'non',
  })

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
          try {
            const tokenParameters = getNftParametersFromUrl(decodedQRData.data)
  
            const validationResponse = await validateTicket(tokenParameters)
            const validationStateRes = _.get(validationResponse, 'data.state', 'no_data')
            console.log(validationStateRes) 
            setValidationState({...validationState, state: validationStateRes})
          } catch (e) {
            setValidationState({...validationState, state: 'no_data'})
          }
          setShowTimeOut(false) 
        }, 2500);
      
        return (() => {
          clearTimeout(interval)
        });
      }
    })()
  }, [decodedQRData])

  const _stateView = (state) => {
    let message = "default";
    let icon = <Error />;

    switch(state) {
      case 'used': 
        message = "Este ticket ya fue usado";
      break;
      case 'marked_success':
        message = "Ticket marcado";
        icon = <DoneOutlineOutlined />
      break;
      case 'marked_failiure':
        message = "No se pudo marcar";
      break;
      case 'no_data':
        message = "Error, algo salio mal";
      break;
      case 'non_existent':
        message = "QR no valido";
      break;
      default:
        return;
    }

    return (
      <Grid container>
        <Grid item xs={6}><p>{message}</p></Grid>
        <Grid item xs={6}><p>{icon}</p></Grid>
      </Grid>
     )
  }

  return (
    <Box style={styles.component}>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <div style={styles.content}>
        <div style={styles.infoTextContainer}>
          <h3>Scan QR</h3>
          {validationState.state}
          {timeOut ? <CircularProgress /> : _stateView(validationState.state)}
        </div>
        <div id="qrcodemountnode"></div>
      </div>
    </Box>
  )
}

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: FullPageLoader,
})(Demo)
