const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const { NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD, FRONTEND_URL } = require('../constants/config');
const emailTemplates = require('../email-templates/index');
const { CustomError } = require('../error/CustomError');

module.exports = {
    sendMail: async (userMail = '', emailAction = '', context = {}) => {
        const transporter = nodemailer.createTransport({
            from: 'No reply',
            auth: {
                user: NO_REPLY_EMAIL,
                pass: NO_REPLY_EMAIL_PASSWORD,
            },
            service: 'gmail',
        });

        const hbsOptions = {
            viewEngine: {
                extname: '.hbs',
                defaultLayout: 'main',
                layoutsDir: path.join(process.cwd(), 'email-templates', 'layouts'),
                partialsDir: path.join(process.cwd(), 'email-templates', 'partials'),
            },
            viewPath: path.join(process.cwd(), 'email-templates', 'views'),
            extName: '.hbs',
        };

        transporter.use('compile', hbs(hbsOptions));

        const templateInfo = emailTemplates[emailAction];

        if (!templateInfo) {
            throw new CustomError('wrong email action', 500);
        }

        context.frontendURL = FRONTEND_URL;

        return transporter.sendMail({
            from: 'No reply',
            to: userMail,
            subject: templateInfo.subject,
            template: templateInfo.template,
            context,
        });
    }
};
