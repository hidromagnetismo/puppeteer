
const { Schema, model } = require('mongoose');

const helpTopicSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: String,
})

module.exports = model('HelpTopic', helpTopicSchema);
