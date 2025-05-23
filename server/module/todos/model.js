const mongoose = require('mongoose');
const schema = new mongoose.Schema(
    {
        text: String
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Todo', schema);