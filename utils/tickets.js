import admin from 'firebase-admin'
import firebase from "firebase";
import * as _ from 'lodash';

const markTicketAsUsed = async (contractAddress, tokenId) => {
  const database = firebase.database(admin.apps[0])

  var tickets = firebase.database().ref(`tickets/${contractAddress}/${tokenId}/marked`);
  
  tickets.on('value', (ticket) => {
    const data = ticket.val();
    console.log(data)
    return data;
  });

  firebase
  .database(admin.apps[0])
  .ref(`tickets/${contractAddress}/${tokenId}`)
  .update({marked:false});

    // isTicketUsed(contractAddress, tokenId)

  // console.log("markedRequest", markedRequest)
  // return markedRequest
}

const getTicket = async (contractAddress, tokenId) => {
  const database = firebase.database(admin.apps[0])

  return database.ref(`tickets/${contractAddress}/${tokenId}`)
  .get()
  .then((snapshot) => {
    if (snapshot.exists()) {
       return snapshot.val()
    } else {
      console.log("NFT no existe");
      return false;
    }
  }).catch((error) => {
    console.error(error);
    return false
  });  
}

const isTicketUsed = async (contractAddress, tokenId) => {
  const database = firebase.database(admin.apps[0])

  return database.ref(`tickets/${contractAddress}/${tokenId}`)
  .get()
  .then((snapshot) => {
    if (snapshot.exists()) {
      const ticket = snapshot.val()
      return _.get(ticket, 'marked', null);
    } else {
      console.log("NFT no existe");
      return false;
    }
  }).catch((error) => {
    console.error(error);
  });  
}

export { markTicketAsUsed, isTicketUsed, getTicket }