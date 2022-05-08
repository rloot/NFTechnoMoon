import admin from 'firebase-admin'
import firebase from "firebase";

const markTicketAsUsed = (contractAddress, tokenId) => {
  const database = firebase.database(admin.apps[0])

  firebase
    .database(admin.apps[0])
    .ref(`tickets/${contractAddress}/used/${tokenId}`)
    .set(true);
  
  var tickets = firebase.database().ref(`tickets/${contractAddress}`);
  tickets.on('value', (ticket) => {
    const data = ticket.val();
    console.log(data)
    return data;
  });
}

const isTicketUsed = async (contractAddress, tokenId) => {
  const database = firebase.database(admin.apps[0])

  return await database.ref(`tickets/${contractAddress}/used/${tokenId}`)
  .get()
  .then((snapshot) => {
    if (snapshot.exists()) {
      const snap = snapshot.val()
      console.log('snap', snap)
      return snap;
    } else {
      console.log("No data available");
      return false;
    }
  }).catch((error) => {
    console.error(error);
  });  
}

export { markTicketAsUsed, isTicketUsed }