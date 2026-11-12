require('dotenv/config')

const express = require("express");


const {loggerMiddleWare} = require("./middleware/logger")

const bookRouter = require("./routes/books.route");

const app = express();

const PORT = 8000;

app.use(express.json());
app.use(loggerMiddleWare);


app.use("/books", bookRouter);

app.listen(PORT, () => {
  console.log("HTTP Server is running on PORT: ", PORT);
});
