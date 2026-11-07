const http = require('node:http')

const server = http.createServer((req,res) => {
    switch(req.url){
        case '/':
            res.writeHead(201);
            return res.end("Homepage");
        case '/contact-us':
            res.writeHead(200);
            return res.end("Thank You for Contacting Us");
        case '/about':
            res.writeHead(200);
            return res.end("Hey Welcome to Aboubt Section");
        default:
            res.writeHead(404);
            return res.end("Not Found")
    }
})

server.listen(8000 , () => {console.log('Server is running on PORT: 8000')})