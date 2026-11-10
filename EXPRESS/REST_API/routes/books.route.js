const express = require("express");

const app = express();

const {BOOKS} = require('../db/book')

//created a route variable
const router = express.Router();

//creating routes
router.get("/", (req, res) => {
  res.json(BOOKS);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id))
    return res.status(400).json({ error: "ID Should be an integer" });
  const book = BOOKS.find((e) => e.id === id);
  if (!book) return res.json("Book does not exist");
  return res.json(book);
});

router.post("/", (req, res) => {
  const { title, author } = req.body;
  if (!title || title === "")
    return res.status(400).json({ error: "title is required" });
  const book = { id: BOOKS.length + 1, title, author };
  BOOKS.push(book);
  return res
    .status(201)
    .json({ message: "Book Added Succesfully", id: BOOKS.length });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id))
    return res.status(400).json({ error: "ID Should be an integer" });

  const indexToDelete = BOOKS.findIndex((e) => e.id === id);
  if (indexToDelete < 0)
    return res.status(400).json({ error: "Book Does Not Exist" });
  BOOKS.splice(indexToDelete, 1);

  return res.status(201).json({ Message: "Book Deleted Succesfully" });
});

module.exports = router;
