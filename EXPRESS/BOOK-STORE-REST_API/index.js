const express = require("express");
const fs = require("node:fs");

const app = express();

const PORT = 8000;

//DB DATA
const books = [
  { id: 1, title: "Book One", author: "Author One" },
  { id: 2, title: "Book Two", author: "Author Two" },
];

//MIDDLEWARES. -> plugin
app.use(express.json());

//defined a middleware to log all types of request
app.use((req, res, next) => {
  const log = `\n[${Date.now()}] ${req.method} ${req.path}`;
  fs.appendFileSync("log.txt", log, "utf-8");
  next(); //calls next route or middleware
});

// ROUTES
app.get("/books", (req, res) => {
  return res.json(books);
}); //getting all books

//getting book by id
app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id))
    return res.status(400).json({ error: "ID Should be an integer" });
  const book = books.find((e) => e.id === id);
  if (!book) return res.json("Book does not exist");
  return res.json(book);
});

//route to append books
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || title === "")
    return res.status(400).json({ error: "title is required" });
  const book = { id: books.length + 1, title, author };
  books.push(book);
  return res
    .status(201)
    .json({ message: "Book Added Succesfully", id: books.length });
});

app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id))
    return res.status(400).json({ error: "ID Should be an integer" });

  const indexToDelete = books.findIndex((e) => e.id === id);
  if (indexToDelete < 0)
    return res.status(400).json({ error: "Book Does Not Exist" });
  books.splice(indexToDelete, 1);

  return res.status(201).json({ Message: "Book Deleted Succesfully" });
});

app.listen(PORT, () => {
  console.log("HTTP Server is running on PORT: ", PORT);
});
