const express = require("express");
const app = express();
const { decode } = require("querystring");
const { updateDb } = require("./myModule");

const clientDir = __dirname + '\\client\\';

app.get('/', (requset, response) => response.sendFile(clientDir + 'home-page.html'));

app.get('/contact', (requset, response) => response.sendFile(clientDir + 'contact.html'));

app.get('/codeofconduct', (requset, response) => response.sendFile(clientDir + 'codeofconduct.html'));

app.get('/testgame', (requset, response) => response.sendFile(clientDir + 'testgame.html'));

app.get('/client/testgame.js', (requset, response) => response.sendFile(clientDir + 'testgame.js'));

app.get('/img/niklas.jpeg', (requset, response) => response.sendFile(clientDir + 'niklas.jpeg'));

app.get('/img/become-a-good-programmer.jpeg', (requset, response) => response.sendFile(clientDir + 'become-a-good-programmer.jpg'));

app.get('/styles.css', (requset, response) => response.sendFile(clientDir + 'styles.css'));

app.get('*', (requset, response) => response.sendFile(clientDir + '404.html'));

app.listen(3000);

console.log("Niklas' personal website runnning on port 3000");