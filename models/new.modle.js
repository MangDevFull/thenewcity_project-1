const mongoose = require('mongoose')
mongoose.Promise = global.Promise;


const newsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumb: {
        type: String,
        required: true,
    },
    image_content : {
        type : String,
        required: true,
    },
    create_day: {
        type: String,
        required: true,
    },
}, { collection: 'news' },{_id : false});
module.exports = mongoose.model('News', newsSchema);