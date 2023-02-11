const Koa = require('koa');
const mongoose = require('mongoose');
const {koaBody} = require('koa-body');
const router = require('./routes');

const app = new Koa();
const PORT = 3000;

mongoose.connect('mongodb://localhost/moviesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});