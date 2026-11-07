const http = require('node:http');

const server = http.createServer(8000 , (req,res) => {
    console.log("Server is running on PORT: 8000");
})