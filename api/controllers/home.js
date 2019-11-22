const Paragraph = require('../models/paragraph');
const mongoose = require('mongoose');

exports.home_get = (request, response, next) => {
    response.render('home');
}

exports.home_post = (request, response, next) => {

    try {
        const rawText = request.body.paragraphs;
        var output = rawText.split(/(?:\r\n){2,}/);

        output.forEach(element => {
            const paragraph = new Paragraph({
                text: element,
                tags: element.toLowerCase().split(/\s/g)
            });

            paragraph.save().then().catch(error => {
                return response.status(404).json({
                    message: "Something went wrong",
                    error
                });
            });
        });

        response.status(200).render('home');

    } catch (error) {
        console.log(error);
    }
}

exports.search_get = (request, response, next) => {
    try {

        Paragraph.collection.createIndex({ tags: 'text' });
        response.status(200).render('search', {
            paragraphs: [{
                "text": "Nothing to show here."
            }]
        });
        next();
    } catch (error) {
        console.log(error);
    }
}

exports.search_post = (request, response, next) => {
    try {
        const query = request.body.query;
        Paragraph.find({
            $text: {
                $search: query
            }
        }, {
            score: {
                $meta: 'textScore'
            }
        }).sort({
            score: {
                $meta: 'textScore'
            }
        }).select('_id text').limit(10).exec().
            then(paragraphs => {
                if (paragraphs.length === 0) {
                    response.status(200).render('search', {
                        paragraphs: [{
                            "text": "Not found."
                        }]
                    });
                } else {
                    response.status(200).render('search', {
                        paragraphs: paragraphs
                    });
                }
            }).catch(error => {
                return response.status(404).json({
                    message: "Something went wrong",
                    error
                });
            });
    } catch (error) {
        console.log(error);
    }
}

exports.clear_get = (request, response, next) => {
    try {
        Paragraph.deleteMany({}).exec().then(paragraphs => {
            response.status(200).render('infopage');
        }).catch(error => {
            response.status(404).json({
                message: "Something went wrong",
                error
            });
        });
        Paragraph.collection.drop();
    } catch (error) {
        console.log(error);
    }
}