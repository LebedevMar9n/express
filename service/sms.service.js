const twilio = require('twilio');

const { TWILIO_ACOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = require('../constants/config');

const client = twilio(TWILIO_ACOUNT_SID, TWILIO_AUTH_TOKEN);

module.exports = {
    sendSMS: async (phone, massage) => {
        console.log(`SMS start sending to: ${phone} | massage:${massage}`);
        try {
            await client.messages
                .create({
                    from: TWILIO_PHONE_NUMBER,
                    to: phone,
                    body: massage,
                });
        } catch (error) {
            console.error(`SMS error  to: ${phone} | error:${error}`);
        }
    }
};