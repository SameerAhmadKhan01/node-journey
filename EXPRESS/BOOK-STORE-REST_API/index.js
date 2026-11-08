const express = require("express");

const app = express();

const PORT = 8000;

//DB DATA
const books = [
  { id: 1, title: "Book One", author: "Author One" },
  { id: 2, title: "Book Two", author: "Author Two" },
];


// ROUTES
app.get('/books' , (req , res) => {
    return res.json(books);
})//getting all books

//getting book by id
app.get('/books/:id' ,(req , res) => {
    const id = parseInt(req.params.id);
    if(isNaN(id)) return res.json({'error' : "ID Should be an integer"})
    const book = books.find(e => e.id === id);
    if(!book) return res.json('Book does not exist');
    return res.json(book);
})



app.listen(PORT, () => {
  console.log("HTTP Server is running on PORT: ",PORT);
});
