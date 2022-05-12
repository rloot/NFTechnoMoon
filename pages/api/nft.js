import { verifyIdToken } from 'next-firebase-auth'
import fetch from 'node-fetch';
import initAuth from '../../utils/initAuth'
import { isTicketUsed, markTicketAsUsed, getTicket } from '../../utils/tickets'
import * as _ from 'lodash'

initAuth()

const handler = async (req, res) => {
  try {
    
    // TODO: validate path and secret 
    const contractAddress = _.get(req, 'query.contractAddress', null) // TODO: pasar param por post
    const tokenId = _.get(req, 'query.tokenId', null)
    const secret = _.get(req, 'query.secret', null)
    
    console.log({contractAddress,tokenId,secret})
    if (!contractAddress && !tokenId && !secret) {
      return res.status(402).json({ error: 'Missing param'})
    }

    // if not authorize return metadata.
    if (!(req.headers && req.headers.authorization)) {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
    

    }
    
    const token = req.headers.authorization
    await verifyIdToken(token)
        
    //Check if token exists
    const ticket = await getTicket(contractAddress, tokenId)
    if (_.isEmpty(ticket)) { return res.status(200).json({ state: 'non_existent', ticket }) }

    //Check if token is used
    const isTokenUsedResponse = _.get(ticket, 'marked', false)
    if (isTokenUsedResponse) { return res.status(200).json({ state: 'used', isTokenUsedResponse }) } 
    else {  
      // Mark token
      const setMarked = await markTicketAsUsed(contractAddress, tokenId)
      
      if(setMarked) 
      {
        return res.status(200).json({ state: 'marked_success', isTokenUsedResponse })
      }
      else 
      {
        return res.status(200).json({ state: 'marked_failure', })
      }
    }
    
  } catch (e) {
    // eslint-disable-next-line no-console
    return res.status(403).json({ error: e})
  }

}

export default handler
