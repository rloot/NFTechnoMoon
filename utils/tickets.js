import admin from 'firebase-admin'
import firebase from "firebase";

const markTicketAsUsed = (contractAddress, tokenId) => {
  const database = firebase.database(admin.apps[0])

  var tickets = firebase.database().ref(`tickets/${contractAddress}`);
  tickets.on('value', (ticket) => {
    const data = ticket.val();
    console.log(data)
    return data;
  });

  // firebase
  //   .database(admin.apps[0])
  //   .ref(`tickets/${contractAddress}/${tokenId}/marked `)
  //   .set(true);

}

const isTicketUsed = async (contractAddress, tokenId) => {
  const database = firebase.database(admin.apps[0])

  return database.ref(`tickets/${contractAddress}/${tokenId}/marked`)
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