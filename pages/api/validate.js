import { setAuthCookies } from "next-firebase-auth";
import initAuth from "../../utils/initAuth";
import initB from "../../utils/initB";
import admin from 'firebase-admin'
import firebase from "firebase";

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

  console.log(req.params)

  markTicketAsUsed('0xa', 'b');
  markTicketAsUsed('0xa', 'c');

};

export default handler;
