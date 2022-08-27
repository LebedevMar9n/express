const { Schema, model } = require('mongoose');

const { emailActionTypeEnum } = require('../enums');


const ActionTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    action_token: {
        type: String,
        required: true
    },

    actionType: {
        type: String,
        required: true,
        enum: Object.values(emailActionTypeEnum)
    },

}, { timestamps: true });

module.exports = model('ActionToken', ActionTokenSchema);