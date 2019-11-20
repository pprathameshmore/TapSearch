const mongoose = require('mongoose');

const ParagraphScheme = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        indexes : true
    }
});

module.exports = mongoose.model('Paragraph', ParagraphScheme);