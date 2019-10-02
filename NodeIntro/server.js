const { createServer } = require("http");
const { createReadStream } = require("fs");
const { decode } = require("querystring");
var hej = require("./myModule");

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

hej.hej();

const sendFile = (response, status, type, filePath) => {
  response.writeHead(status, { "Content-Type": type });
  createReadStream(filePath).pipe(response);
};

createServer((request, response) => {
  if (request.method === "POST") {
    let body = "";
    request.on("data", data => {
      body += data;
    });
    request.on("end", () => {
      const { name, email, message } = decode(body);
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        var query = { email: `${email}` };
        dbo.collection("WESWEB").find(query).toArray(function (err, result) {
          if (err) throw err;
          console.log("DEBUG")
          console.log(result);
          if (result.length!=0) {
            var newvalues = { $set: { name: `${name}`, message: `${message}` } };
            dbo.collection("WESWEB").updateOne(query, newvalues, function (err, res) {
              if (err) throw err;
              console.log("1 document updated");
              db.close();
            });
          } else {
            var myobj = { name: `${name}`, email: `${email}`, message: `${message}` };
            dbo.collection("WESWEB").insertOne(myobj, function (err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              db.close();
            });
          }
        });
      });
      console.log(`${name} (${email}): ${message}`);
    });
  }

  switch (request.url) {
    case "/":
      return sendFile(response, 200, "text/html", "./client/home-page.html");
    case "/contact":
      return sendFile(response, 200, "text/html", "./client/contact.html");
    case "/img/niklas.jpeg":
      return sendFile(response, 200, "image/jpeg", "./client/niklas.jpeg");
    case "/styles.css":
      return sendFile(response, 200, "text/css", "./client/styles.css");
    default:
      return sendFile(response, 200, "text/html", "./client/404.html");
  }
}).listen(3000);

console.log("Niklas' personal website runnning on port 3000");
