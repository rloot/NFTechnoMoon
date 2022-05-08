import { setAuthCookies } from "next-firebase-auth";
import initAuth from "../../utils/initAuth";
import initB from "../../utils/initB";
import admin from 'firebase-admin';
import { isTicketUsed, markTicketAsUsed } from '../../utils/ticket';
import firebase from "firebase";
import * as _ from 'lodash'

initB();
initAuth();

const handler = async (req, res) => {

  console.log(req.params)
 
  markTicketAsUsed('0xa', 'b');
  markTicketAsUsed('0xa', 'c');
  isTicketUsed('0xa', 'a')
  isTicketUsed('0xa', 'b')
  isTicketUsed('0xa', 'c')

};

export default handler;
