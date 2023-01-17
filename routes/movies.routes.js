const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get('/movies/create', async function (req, res, next) {
try {
    const allCelebrities = await Celebrity.find()
    res.render('movies/new-movie'), { celebritiesArray: allCelebrities };
} catch (error) {
    next(error)
}
});

router.post('/movies/create', async function (req, res, next) {
const { title, genre, plot, cast } = req.body;
try {
    const createdMovie = await Movie.create({ title, genre, plot, cast });
    res.redirect('/movies');
} catch (error) {
    next(error)
}
});

module.exports = router;