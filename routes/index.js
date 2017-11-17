var express = require('express');
var router = express.Router();
var request = require('request');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var dbUrl = 'mongodb://localhost:27017/addresses';

var collection
MongoClient.connect(dbUrl, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', dbUrl);
    collection = db.collection('addresses');
    collection.remove(); 
    console.log('Removed anything currently in database upon restarting');
    collection.insert(addresses, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the address collection. The documents inserted with "_id" are:', result.length, result);
      }
    })
  }
});

router.get('/addresses', function(req, res) {
  console.log("In Addresses");
  collection.find().toArray(function(err, result) {
    if(err) {
      console.log(err);
    } else if (result.length) {
      console.log("Query Worked");
      console.log(result);
      res.send(result);
    } else {
      console.log("No Documents found");
    }
  });
});

router.post('/addresses', function(req, res) {
    console.log("In Addresses Post");
    console.log(req.body);
    collection.insert(req.body, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted documents into the address collection. The documents inserted with "_id" are:', result);
        res.end('{"success" : "Updated Successfully", "status" : 200}');
      }
    });
});

module.exports = router;

var addresses = [
  {
    name: 'Homer',
    homeAddress: '123 Fake Street',
    phone: '999-555-5555',
    pictureUrl: 'http://www.simpsoncrazy.com/content/pictures/homer/homer-pythagoras.png'
  }
];
