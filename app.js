const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const homeRouter = require('./api/routes/home');
const Paragraph = require('./api/models/paragraph');

const MONGODB_URL = 'mongodb+srv://pprathameshmore:9420776721@cluster0-k8m6f.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URL, {
    dbName: "tapsearch",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (error) => {
    if (error) {
        console.log('Something went wrong' + error);
    } else {
        console.log('Connected to database');
    }
});

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    next();
});

app.set('PORT', (process.env.PORT || 3000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (request, response, next) => {
    response.redirect('/home/index');
});
app.use('/home', homeRouter);

app.use((resquest, response, next) => {
    var error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, resquest, response, next) => {
    response.status(error.status || 500);
    response.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;