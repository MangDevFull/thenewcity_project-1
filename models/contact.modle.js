const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
mongoose.Promise = global.Promise;

const newsSchema = new mongoose.Schema({
    _id: {
        type : Number,
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
    create_day: {
        type: String,
        required: true,
    },
    status: {
        type: String,
    }
}, { collection: 'contacts' },{_id : false});

newsSchema.plugin(AutoIncrement);

module.exports = mongoose.model('contacts', newsSchema);