import { verifyIdToken } from 'next-firebase-auth'
import fetch from 'node-fetch';
import initAuth from '../../utils/initAuth'
import { isTicketUsed, markTicketAsUsed, getTicket } from '../../utils/tickets'
import * as _ from 'lodash'

initAuth()

const handler = async (req, res) => {
  const contractAddress = _.get(req, 'query.contractAddress', null) // TODO: pasar param por post
  const tokenId = _.get(req, 'query.tokenId', null)
  const secret = _.get(req, 'query.secret', null)

  if (!(req.headers && req.headers.authorization)) {
    
    if (!contractAddress && !tokenId && !secret) {
      return res.status(402).json({ error: 'Missing param'})
    }

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  
    const apiKey = process.env.ALCHEMY_KEY
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTMetadata`;
    const tokenType = "erc721";
    const fetchURL = `${baseURL}?contractAddress=${contractAddress}&tokenId=${tokenId}&tokenType=${tokenType}`;
    
    const metadataResponse = await fetch(fetchURL, requestOptions)
      .then(response => response.json())
      .then(response => JSON.stringify(response, null, 2))
      .catch(error => console.log('error', error))      // fetch metadata from nft

      res.status(200).json({metadataResponse})
  }
  
  const token = req.headers.authorization
  // This "unauthenticated" token is just an demo of the
  // "SSR with no token" example.
  if (token === 'unauthenticated') {
    favoriteColor = 'unknown, because you called the API without an ID token'
  } else {
    try {
      await verifyIdToken(token)
          
      // Validate ticket
      const ticket = await getTicket(contractAddress, tokenId)

      console.log(ticket)
      //mark token
      if (_.isEmpty(ticket)) { return res.status(200).json({ state: 'non_existent', ticket }) }
      
      
      const isTokenUsedResponse = _.get(ticket, 'marked', false)

      if(isTokenUsedResponse) 
      {
        return res.status(200).json({ state: 'used', isTokenUsedResponse })
      } 
      else 
      {
        // mark here
        const setMarked = markTicketAsUsed(contractAddress, tokenId)

        if(setMarked) 
        {
          return res.status(200).json({ state: 'marked_success', isTokenUsedResponse })
        }
        else 
        {
          return res.status(200).json({ state: 'marked_failure' })
        }

        //! marked
        // failed to mark
      }
      
    } catch (e) {
      // eslint-disable-next-line no-console
      return res.status(403).json({ error: 'Not authorized' })
    }

 }
}

export default handler
