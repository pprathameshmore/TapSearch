const express = require('express');
const router = express.Router();

const ParagraphController = require('../controllers/home');

router.get('/index', ParagraphController.home_get);
router.post('/index', ParagraphController.home_post);
router.get('/search', ParagraphController.search_get);
router.post('/search', ParagraphController.search_post);
router.get('/clear', ParagraphController.clear_get);

module.exports = router;