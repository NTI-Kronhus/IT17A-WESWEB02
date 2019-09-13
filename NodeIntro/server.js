const { createServer } = require("http");
const { createReadStream } = require("fs");

const sendFile = (response, status, type, filePath) => {
  res.writeHead(status, { "Content-Type": type });
  createReadStream(filePath).pipe(response);
};

createServer((request, result) => {
  switch (request.url) {
    case "/":
      return sendFile(result, 200, "text/html", "./home-page.html");
    case "/img/niklas.jpeg":
      return sendFile(result, 200, "image/jpeg", "./niklas.jpeg");
    case "/styles.css":
      return sendFile(result, 200, "text/css", "./styles.css");
    default:
      return sendFile(result, 200, "text/html", "./404.html");
  }
}).listen(3000);

console.log("Niklas' personal website runnning on port 3000");