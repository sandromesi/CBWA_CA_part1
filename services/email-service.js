'use strict'
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.send = async (to, name) => {
    sgMail.send({
        to: to,
        from: 'alessandro_m_s@hotmail.com',
        subject: 'Bug Tracker API',
        html: `<strong>Hi ${ name }, Welcome to The Bug Tracker API</strong>`,
    });
}