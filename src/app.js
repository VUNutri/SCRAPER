import express from 'express';
import middlewares from './middlewares';
import scrapper from './scraper';

const app = express();

middlewares(app);

app.post('/getList', scrapper);

const PORT = 8084;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Server is running');
  }
});
