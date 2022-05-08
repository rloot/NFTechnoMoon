import { setAuthCookies } from "next-firebase-auth";
import initAuth from "../../utils/initAuth";
import initB from "../../utils/initB";
import admin from 'firebase-admin'
import firebase from "firebase";
import * as _ from 'lodash'

initB();
initAuth();

const handler = async (req, res) => {

  function markTicketAsUsed(contractAddress, tokenId) {
    firebase
      .database(admin.apps[0])
      .ref(`tickets/${contractAddress}/used/${tokenId}`)
      .set(true);
    
    var tickets = firebase.database().ref(`tickets/${contractAddress}`);
    tickets.on('value', (ticket) => {
      const data = ticket.val();
      console.log(data)
    });
  }

  function isUsed(contractAddress, tokenId) {
    const database = firebase.database(admin.apps[0])

    database.ref(`tickets/${contractAddress}/used/${tokenId}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });  
  }

  console.log(req.params)
 
  markTicketAsUsed('0xa', 'b');
  markTicketAsUsed('0xa', 'c');
  isUsed('0xa', 'a')
  isUsed('0xa', 'b')
  isUsed('0xa', 'c')

};

export default handler;
