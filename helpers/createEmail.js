const nodemailer = require('nodemailer');
const { crearHtmlParaCorreo } = require('../utils/templates');


const createTrans = () => {

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.NODEMAILUSER,
      pass: process.env.NODEMAILPASS
    }
  });

  return transport;

}

const sendMail = async (body) => {

  console.log('Enviando mensaje por correo');
  
  const { nom, courriel, telefono, sujec, message } = body;

  try {
   
    const transport = createTrans();
    const info = await transport.sendMail({
      from: 'Transportzz2024@hotmail.com', // sender address
      to: courriel, // list of receivers array
      subject: nom + ' a solicitado sus servicios!!', // Subject line
      text: sujec, // plain text body
      html: crearHtmlParaCorreo(nom, message, courriel, telefono) // html body
    });

    console.log("Message sent: %s", info.messageId);

    return true

  } catch (error) {
    console.error('Error al enviar mensajae por correo:', error);
    return false; // Retorna false indicando que hubo un error al enviar el mensaje
  }

}

module.exports = {
  sendMail
}  