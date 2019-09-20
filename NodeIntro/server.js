const { createServer } = require("http");
const { createReadStream } = require("fs");
const { decode } = require("querystring");

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
      console.log(`${name} (${email}): ${message}`);
    });
  }

  switch (request.url) {
    case "/":
      return sendFile(response, 200, "text/html", "./home-page.html");
    case "/contact":
      return sendFile(response, 200, "text/html", "./contact.html");
    case "/img/niklas.jpeg":
      return sendFile(response, 200, "image/jpeg", "./niklas.jpeg");
    case "/styles.css":
      return sendFile(response, 200, "text/css", "./styles.css");
    default:
      return sendFile(response, 200, "text/html", "./404.html");
  }
}).listen(3000);

console.log("Alex's personal website runnning on port 3000");
