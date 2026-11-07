const http = require("node:http");
const fs = require("node:fs")

const server = http.createServer((req, res) => {
  console.log("Server is running on PORT: 8000");
  const request = req.url;
  const method = req.method;

  const log = `\n[${Date.now()}] : ${request} ${method}`
  fs.appendFileSync('log.txt',log,'utf-8')

  switch (method) {
    case "GET":
      {
        switch (request) {
          case "/":
            return res.writeHead(200).end("Hello from server :)");
          case "/contact-us":
            return res
              .writeHead(200)
              .end("Sure, Email : xyz@gmail.com , Contact : 987654321");
          case "/tweet":
            return res.writeHead(200).end("Tweets Fetched Succesfully!");
        }
      }
      break;
    case "POST":
      {
        switch (request) {
          case "/tweet":
            return res.writeHead(201).end("Tweet Created Succesfully");
        }
      }
      break;
  }
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
