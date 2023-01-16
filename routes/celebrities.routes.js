const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity.model'); ///////

router.get('/celebrities/create', function (req, res, next) {
    res.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', async function (req, res, next) {
const { name, occupation, catchPhrase } = req.body;
try {
    const createdCelebrity = await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect('/celebrites');
} catch (error) {
    next(error)
    res.redirect('/celebrities/new-celebrity');
}
});

module.exports = router;