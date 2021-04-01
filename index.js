const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5055; // 
const ObjectId = require('mongodb').ObjectID;
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hi world!');
})


//////////////


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.su3lx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log("Connection error: ", err);
  const logoCollection = client.db("LogoLand").collection("logos-info");
  // perform actions on the collection object
//getting images from database
app.get('/', (req, res) => {
  res.send("Hello it's working!")
})
  app.get('/addImage', (req, res)=> {
      logoCollection.find()
      .toArray((err, items) => {
          res.send(items);
          console.log(items);
      })
  })
//posting images from database one by one
  app.post('/addImage', (req, res) => {
      const newImage = req.body;
      console.log("adding new Image", newImage);
      logoCollection.insertOne(newImage)
      .then(result =>{
          console.log("Inserted Count", result.insertedCount);
          res.send(result.insertedCount > 0)
      })
  })

  // app.delete('/deleteLogo/:id', (req, res) => {
  //   console.log(req.params.id);
  //   logoCollection.deleteOne({_id:ObjectId(req.params.id)})
  //   .then((err, result) => {
  //     console.log(err);
  //   })
    app.delete('deleteLogo/:id', (req, res) => {
      const id = ObjectID(req.params.id);
      console.log("delete:", id);
      logoCollection.findOneAndDelete({_id: id})
      .then(documents => res.send(!!documents.value))
    })
//   app.get('/addImage', (req, res) => {
//       const images = req.body;
//       console.log("Images::::::::::::::::",images);
//       res.send("hello");
//   })
  console.log("connected");
//   client.close();
});


//////////////

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}) 