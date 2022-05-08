import { setAuthCookies } from "next-firebase-auth";
import initAuth from "../../utils/initAuth";
import initB from "../../utils/initB";

import { getDatabase, ref, set } from "firebase/database";
import firebase from "firebase";

initAuth();
initB();

// Get a reference to the database service
var database = firebase.database();

const handler = async (req, res) => {
  function markTicketAsUsed(contractAddress, tokenId) {
    console.log("/////////////");
    firebase
      .database()
      .ref(`tickets/${contractAddress}/used/${tokenId}`)
      .set(true);
    
    var tickets = firebase.database().ref(`tickets/${contractAddress}`);
    tickets.on('value', (ticket) => {
      const data = ticket.val();
      console.log(data)
    });
    console.log('/////////////')
  }
  markTicketAsUsed('0xa', 'b');
  markTicketAsUsed('0xa', 'c');

  try {
    await setAuthCookies(req, res);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return res.status(500).json({ error: "Unexpected error." });
  }
  return res.status(200).json({ status: true });
};

export default handler;
