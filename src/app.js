import express from 'express';
import middlewares from './middlewares';
import scrapper from './scraper';

const app = express();

middlewares(app);

app.post('/hi', scrapper);

const PORT = 8888;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Server is running');
  }
});
