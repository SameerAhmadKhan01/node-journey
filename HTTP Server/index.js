const http = require("node:http")

const server = http.createServer((req,res) => {
    console.log("I got an incoming response");
    res.writeHead(200);
    res.end("Thnx for visiting");
});

server.listen(8000, () => {
    console.log('HTTP Server is up and running on port 8000');
})