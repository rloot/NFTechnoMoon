const _ = require('lodash')
var qr = require('node-qr-image');
const ticketList = require('../db/viernes_13.json');

const baseUrl = 'https://tickets-in5ghmo2m-technomoon.vercel.app/view/'
const contractAddress = "0x0000000000000000000000000000000000000000";
const contractTickets = _.get(ticketList, `tickets.${contractAddress}`);

// Format needed parameters
const ticketQrData = _.map(contractTickets, (ticket, tokenId)=>{
  return {
      secret: ticket.secret, 
      name: ticket.name,
      tokenId, 
      contractAddress
  };
});

// Construct URLS
const ticketsURLs = _.map(ticketQrData, (ticket, id) => {
  let url = new URL(baseUrl);
  let name = _.get(ticket,'name',`no_name_${id}`);

  _.forEach(ticket, (param, key) => {
    url.searchParams.set(key, param);
  });

  return {url: url.href, name};
});

console.log(ticketsURLs)

// Construct QR codes
_.forEach(ticketsURLs, (urlData,id) => {
  let qr_svg = qr.image(urlData.url, { type: 'png', size: 100 });
  qr_svg.pipe(require('fs').createWriteStream(`QRs/${urlData.name}_${id}.png`));
});

