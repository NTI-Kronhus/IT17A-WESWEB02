var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


exports.updateMessageDb = function (dB, collection, jsonIn)
{
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dB);
        var query = { email: `${jsonIn.email}` };
        dbo.collection(collection).find(query).toArray(function (err, result) {
          if (err) throw err;
          console.log(result);
          if (result.length!=0) {
            var newvalues = { $set: { name: `${jsonIn.name}`, message: `${jsonIn.message}` } };
            dbo.collection(collection).updateOne(query, newvalues, function (err, res) {
              if (err) throw err;
              db.close();
            });
          } else {
            var myobj = { name: `${jsonIn.name}`, email: `${jsonIn.email}`, message: `${jsonIn.message}` };
            dbo.collection(collection).insertOne(myobj, function (err, res) {
              if (err) throw err;
              db.close();
            });
          }
        });
      });
};

exports.updateForumDb = function (dB, collection, jsonIn)
{
  MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(dB);
      var query = { topic: `${jsonIn.topic}` };
      dbo.collection(collection).find(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        if (result.length!=0) {
          var newvalues = { $set: { author: `${jsonIn.author}`, topic: `${jsonIn.topic}`, message: `${jsonIn.message}` } };
          dbo.collection(collection).updateOne(query, newvalues, function (err, res) {
            if (err) throw err;
            db.close();
          });
        } else {
          var myobj = { author: `${jsonIn.author}`, topic: `${jsonIn.topic}`, message: `${jsonIn.message}` };
          dbo.collection(collection).insertOne(myobj, function (err, res) {
            if (err) throw err;
            db.close();
          });
        }
      });
    });
};

exports.updateUserDb = function (dB, collection, jsonIn)
{
  MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(dB);
      var query = { topic: `${jsonIn.topic}` };
      dbo.collection(collection).find(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        if (result.length!=0) {
          var newvalues = { $set: { author: `${jsonIn.author}`, topic: `${jsonIn.topic}`, message: `${jsonIn.message}` } };
          dbo.collection(collection).updateOne(query, newvalues, function (err, res) {
            if (err) throw err;
            db.close();
          });
        } else {
          var myobj = { author: `${jsonIn.author}`, topic: `${jsonIn.topic}`, message: `${jsonIn.message}` };
          dbo.collection(collection).insertOne(myobj, function (err, res) {
            if (err) throw err;
            db.close();
          });
        }
      });
    });
};