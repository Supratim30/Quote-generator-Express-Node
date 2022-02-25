const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({ extended: true }))





const connectionString = 'mongodb+srv://supratim30:Vx2em4DQjYQFfTog@cluster0.w2o9m.mongodb.net/quotes?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    
    const db = client.db('quotes')
    const quotesCollection = db.collection('quotes')

    app.listen(3000, function() {
      console.log('listening on 3000')
    })
    
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html')
      const cursor = db.collection('quotes').find()
  console.log(cursor)
    })
    
    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
    .then(result => {
res.redirect('/')    })
    .catch(error => console.error(error))
    });
  })
  .catch(error => console.error(error))
  