const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get('/movies/create', async function (req, res, next) {
    try {
        const allCelebrities = await Celebrity.find()
        res.render('movies/new-movie', { celebritiesArray: allCelebrities });
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

router.get('/movies', async function (req, res, next) {
    try {
        const allMovies = await Movie.find()
        res.render('movies/movies', { moviesArray: allMovies});
    } catch (error) {
        next(error)
    }
});

router.get('/movies/:movieId', async function (req, res, next) {
    const { movieId } = req.params;
    try {
        const movie = await Movie.findById(movieId).populate('cast');
        res.render('movies/movie-details',  movie );
    } catch (error) {
        next(error)
    }
});

  router.post('/movies/delete/:movieId', async function (req, res, next) {
    const { movieId } = req.params;
    try {
        const movie = await Movie.findById(movieId);
        await Movie.deleteOne({ _id: movieId });
        res.redirect('/movies');
    } catch (error) {
        next(error)
    }
  });

  router.get('/movies/edit/:movieId', async function (req, res, next) {
    const { movieId } = req.params;
    try {
        const movie = await Movie.findById(movieId).populate('cast');
        const allCelebrities = await Celebrity.find();
        const data = {movie, allCelebrities};
        res.render('movies/edit-movie', data);
    } catch (error) {
        next(error)
    }
  });

  router.post('/movies/edit/:movieId', async function (req, res, next) {
    const { title, genre, plot, cast } = req.body;
    const { movieId } = req.params;
    try {
        const editedMovie = await Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast }, { new: true });
        res.redirect(`/movies/${editedMovie._id}`);
    } catch (error) {
        next(error)
    }
  });

module.exports = router;