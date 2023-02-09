const Router = require('koa-router');
const body = require('koa-body');
const Movie = require('./models/movie');

const router = new Router();

router.get('/movies', async (ctx, next) => {
const movies = await Movie.find({});
ctx.body = movies;
});

router.post('/movies', body(), async (ctx, next) => {
const movie = new Movie({
title: ctx.request.body.title,
director: ctx.request.body.director,
year: ctx.request.body.year
});
await movie.save();
ctx.body = movie;
});

router.put('/movies/:id', body(), async (ctx, next) => {
const id = ctx.params.id;
const { title, director, year } = ctx.request.body;
const movie = await Movie.findOneAndUpdate({ _id: id }, { title, director, year }, {
new: true
});
ctx.body = movie;
});

router.delete('/movies/:id', async (ctx, next) => {
const id = ctx.params.id;
const movie = await Movie.findOneAndRemove({ _id: id });
ctx.body = movie;
});

module.exports = router;