import nodemailer from 'nodemailer';
import {EMAIL_USER, EMAIL_PASS} from './data.js'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  },
});
