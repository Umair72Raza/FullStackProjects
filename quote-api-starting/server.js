const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT =  5501;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {

  const thequote = getRandomElement(quotes);
  res.send({quote: thequote});
  })



app.get('/api/quotes', (req, res) =>
{    
  if(req.query.person !== undefined) {
    const pushed = quotes.filter(quote => quote.person === req.query.person);
    res.send({
        quotes: pushed
    });
  } else {
    res.send({
        quotes: quotes
    });
  }
});

app.post('/api/quotes', (req, res) => {
   const newP = req.query.person;
   const newQ = req.query.quote;
    const newQuote = {
        quote: newQ,
        person: newP
    }
    if(newP && newQ)
    {
    quotes.push(newQuote);
    res.send({quote: newQuote})
    }
    else{
        res.status(400).send();
    }
})


app.listen(PORT,'127.0.0.1',()=>{
    console.log(`Started Listening at ${PORT}`);
})