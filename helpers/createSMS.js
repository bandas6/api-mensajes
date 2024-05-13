const twilio = require('twilio');

const accountSid = process.env.TWILIOACCOUNDSID;
const authToken = process.env.TWILIOTOKEN;

const client = new twilio(accountSid, authToken);

const createSMS = async (body) => {

    const { nom, courriel, telefono, sujec, message } = body;

    try {
        const messageToSend = `Nueva Solicitud de mudanza\n Nombre: ${nom}\nCorreo electrónico: ${courriel}\nTeléfono: ${telefono}\nAsunto: ${sujec}\nMensaje: ${message}`;

        const messageResp = await client.messages.create({
            body: messageToSend,
            to: '+1' + telefono,
            from: '+13342768635',
        });

        console.log(messageResp.sid); // Imprime el SID del mensaje si se envía correctamente
        return true; // Retorna true indicando que el mensaje se envió correctamente

    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        throw new Error('Error al enviar el mensaje:', error)
        return false; // Retorna false indicando que hubo un error al enviar el mensaje
    }
};


module.exports = createSMS;