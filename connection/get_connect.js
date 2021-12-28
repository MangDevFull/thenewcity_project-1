var mongoose = require('mongoose')

// Connect database

function connect() {
    mongoose.connect('mongodb://127.0.0.1:27017/thenewcity', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Database connected');
        })
        .catch((error) => {
            console.log('Error connecting to database');
        });
}

module.exports = {
    connect: connect,
}