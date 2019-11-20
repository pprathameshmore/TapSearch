const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const homeRouter = require('./api/routes/home');


const MONGODB_URL = 'mongodb+srv://pprathameshmore:9420776721@cluster0-k8m6f.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URL, {
    dbName: "tapsearch",
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error) => {
    if (error) {
        console.log('Something went wrong' + error);
    } else {
        console.log('Connected to database');
    }
});

app.set('PORT', (process.env.PORT || 3000));

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/home', homeRouter);

app.get('/', (request, response, next) => {
    response.status(200).json({
        message: "Welcome to TapSeach"
    });
});

module.exports = app;