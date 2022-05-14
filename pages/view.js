import React, { useCallback, useEffect, useState } from 'react'
import { useAuthUser, withAuthUser, AuthAction } from 'next-firebase-auth'
import { Box, CircularProgress, Typography } from '@material-ui/core'
import * as _ from 'lodash'

const styles = {
  content: {
    padding: 32,
    backgroundColor: '#00000',
    textColor: '#FFFFFF',
    textAlign: 'center'
  },
  infoTextContainer: {
    marginBottom: 12,
  },
  component: {
    backgroundColor: '#000'
  },
  video: {
    width: '100%',
    margin: 'auto',
    maxWidth: '600px',
    maxHeight: '600px',

  }
}
  
const View = () => {
  const AuthUser = useAuthUser() // the user is guaranteed to be authenticated

  const getNftParametersFromUrl = () => {
    // http://localhost:3000?contractAddress=0xa&tokenId=0&secret=a
    const url = new URL(window.location.href);

    const requestedNft = new URLSearchParams(url.search);

    return {
      contractAddress: requestedNft.get('contractAddress'),
      tokenId: requestedNft.get('tokenId'),
      name: requestedNft.get('name'),
      secret: requestedNft.get('secret')
    }
  }

  const [ token, setTokenData ] = useState({
    loading: false,
    error: false,
    data: {},
  })

  useEffect(() => {
    const ticketParams = getNftParametersFromUrl()
    setTokenData({...token, data: ticketParams})
  }, [])

  const _tokenRender = () => {

    return (
      <div className='container'>
        <p>
          Hola {_.get(token,'data.name', ' ')} este es un elemento unico, coleccionable y valido por una entrada.
        </p>

        <p>{(_.get(token,'data.contractAddress', '')).slice(0,10)} ... </p>
        <p>{_.get(token,'data.tokenId', '')}</p>
        <p>{_.get(token,'data.secret', '')}</p>

        <video autoPlay={true} loop={true} style={styles.video}>
         <source type="video/mp4" src="https://technomoon.com.ar/technoMoonPresentacion.mp4" />  
        </video>
      </div>
    )
  }

  return (
    <Box style={styles.component}>
      <div style={styles.content}>
        <div style={styles.infoTextContainer}>

          <div> 
          <h1>TechnoMoon NFT</h1>
            {!token.loading ?  _tokenRender() : <CircularProgress />}
          </div>
        </div>

      </div>
    </Box>
  )

}

export default withAuthUser()(View)
