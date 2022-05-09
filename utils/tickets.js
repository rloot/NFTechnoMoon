import admin from 'firebase-admin'
import firebase from "firebase";
import * as _ from 'lodash';

const markTicketAsUsed = async (contractAddress, tokenId) => {
  const database = firebase.database(admin.apps[0])

  var ticket = `tickets/${contractAddress}/${tokenId}`;

  firebase
  .database(admin.apps[0])
  .ref(ticket)
  .update({marked:true});

  return await isTicketUsed(contractAddress, tokenId)
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
      return false;
    }
  }).catch((error) => {
    console.error(error);
  });  
}

export { markTicketAsUsed, isTicketUsed, getTicket }