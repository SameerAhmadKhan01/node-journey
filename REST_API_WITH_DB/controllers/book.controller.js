const booksTable = require("../models/book.model");
const db = require("../db");
const { eq } = require("drizzle-orm");

exports.getAllBooks = async function (req, res) {
  const books = await db.select().from(booksTable);
  return res.status(200).json(books);
};

exports.getBookById = async function (req, res) {
  const id = req.params.id;

  const [book] = await db.select().from(booksTable)
    .where((table) => eq(id, table.id))
    .limit(1);
  if (!book) return res.json("Book does not exist");
  return res.json(book);
};

exports.createBook = async function (req, res) {
  const { title, authorId, description } = req.body;
  if (!title || title === "")
    return res.status(400).json({ error: "title is required" });

  const [result] = await db.insert(booksTable).values({title, authorId, description}).returning({
    id: booksTable.id
  });

  return res
    .status(201)
    .json({ message: "Book Added Succesfully", id: result.id });
};

exports.deleteBookById = async function (req, res) {
  const id = req.params.id;

  const [deleted] = await db
    .delete(booksTable)
    .where(eq(booksTable.id, id))
    .returning({ id: booksTable.id });

  if (!deleted) return res.status(404).json({ error: "Book does not exist" });
  return res.status(200).json({ message: "Book Deleted Successfully" });
};