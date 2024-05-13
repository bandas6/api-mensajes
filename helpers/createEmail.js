const postmarkTransport = require('nodemailer-postmark-transport');
const nodemailer = require('nodemailer');

const { crearHtmlParaCorreoCotizacion, crearHtmlParaCorreoEstimacion } = require('../utils/templates');


const sendMailCotizacion = async (body) => {

  console.log('Enviando mensaje por correo');

  const { nom, courriel, telefono, sujec, message } = body;

  try {

    const transport = nodemailer.createTransport(
      postmarkTransport({
        auth: {
          apiKey: process.env.POSTMARKKEY // Reemplaza 'tu_api_key' con tu API key de Postmark
        }
      })
    );

    const info = await transport.sendMail({
      from: 'demenagement@transportdoublez.com', // sender address
      to: 'demenagement@transportdoublez.com', // list of receivers array
      subject: nom + ' a solicitado sus servicios!!', // Subject line
      text: sujec, // plain text body
      html: crearHtmlParaCorreoCotizacion(nom, message, courriel, telefono) // html body
    });

    console.log("Message sent: %s", info.messageId);

    return true

  } catch (error) {

    console.error('Error al enviar mensajae por correo:', error);
    return false; // Retorna false indicando que hubo un error al enviar el mensaje
  }

}

const sendMailEstimacion = async (body) => {

  console.log('Enviando mensaje por correo');

  const { date, name, tel, cell, email, street, city, postalCode, province, numRooms, floor, elevator, refrigerator,
    stove, washer, dryer, dishwasher, divanTwoPlace, divanthreePlace, bureau, table, lit, armoire, others, numberBoxes,
    comments, streetNumber, would, codePostal, provinceArrival, numberPieces, floorArrival, elevatorArrival } = body;

  try {

    const transport = nodemailer.createTransport(
      postmarkTransport({
        auth: {
          apiKey: process.env.POSTMARKKEY // Reemplaza 'tu_api_key' con tu API key de Postmark
        }
      })
    );

    const info = await transport.sendMail({
      from: 'demenagement@transportdoublez.com', // sender address
      to: 'demenagement@transportdoublez.com', // list of receivers array
      subject: name + ' a solicitado sus servicios!!', // Subject line
      text: email, // plain text body
      html: crearHtmlParaCorreoEstimacion(date, name, tel, cell, email, street, city, postalCode, province, numRooms, floor, elevator, refrigerator,
        stove, washer, dryer, dishwasher, divanTwoPlace, divanthreePlace, bureau, table, lit, armoire, others, numberBoxes,
        comments, streetNumber, would, codePostal, provinceArrival, numberPieces, floorArrival, elevatorArrival) // html body
    });

    console.log("Message sent: %s", info.messageId);

    return true

  } catch (error) {

    console.error('Error al enviar mensajae por correo:', error);
    return false; // Retorna false indicando que hubo un error al enviar el mensaje
  }

}

module.exports = {
  sendMailCotizacion,
  sendMailEstimacion
}  