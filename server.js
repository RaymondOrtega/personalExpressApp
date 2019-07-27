const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var db

const url = 'mongodb+srv://raymond:raymond@demoproject-cf8wl.mongodb.net/test?retryWrites=true&w=majority'
const dbName = "demo"

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

  app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
      if (err) return console.log(err)
      // renders index.ejs
      res.render('index.ejs', {
        quotes: result
      })
    })
  })
  // console.log(res)  // send HTML file populated with quotes here



app.put('/changeColor', (req, res) => {
  console.log(req.body);
  db.collection('quotes')
    .findOneAndUpdate({
      name: req.body.name
    }, {
      $set: {
        color: "red"
      }
    }, {
      sort: {
        _id: -1
      },
      upsert: false
    }, (err, result) => {
      if (err) return res.send(err)
      //console.log();
      res.send(result)
    })
})

// Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
// Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({
      names: req.body.name
    },
    (err, result) => {
      if (err) return res.send(500, err)
      res.send({
        message: 'I DID IT!!'
      })
    })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save({
    name: req.body.name,
    quote: req.body.quote,
    color: "black"
  }, (err, result) => {
    if (err) return console.log(err)
    console.log(req.body, req, res)
    console.log('saved to datatbase')
    res.redirect('/');
  })

})
