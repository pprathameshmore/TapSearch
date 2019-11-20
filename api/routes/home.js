const express = require('express');
const router = express.Router();

const Paragraph = require('../models/paragraph');

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: "Request is successful"
    });
});

router.post('/index', (request, response, next) => {

    try {
        const rawText = request.body.text;
        var output = rawText.split(/(?:\r\n){2,}/);
        console.log(output);

        output.forEach(element => {
            const paragraph = new Paragraph({
                text: element,
                tags: element.toLowerCase().split(/\s/g)
            });

            paragraph.save().then(paragraph => {
                console.log(paragraph);
            }).catch(error => {
                console.log(error);
            });
        });


        response.status(200).json({
            message: "Data uploaded successfully"
        });
    } catch (error) {
        console.log(error);
    }
});

router.get('/search/:query', (request, response, next) => {
    try {
        const query = request.params.query;

        Paragraph.find({ $text: { $search: query } }, { score: { $meta: 'textScore' } }).sort({
            score: { $meta: 'textScore' }
        }).select('_id text tags').exec().
            then(paragraphs => {
                response.status(200).json({
                    paragraphs
                });
            }).catch(error => {
                console.log(error);
            });

    } catch (error) {
        console.log(error);
    }
});

router.get('/clear', (request, response, next) => {
    try {
        Paragraph.remove({}).exec().then(paragraphs => {
            console.log(paragraphs);
            response.status(200).json({
                message: "All documentes removed"
            })
        }).catch(error => {
            console.log(error);
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;