const express = require("express");
const authorsTable = require("../models/author.model");
const booksTable = require("../models/book.model");
const db = require("../db");
const router = express.Router();
const { eq } = require("drizzle-orm");

router.get("/", async (req, res) => {
  const authors = await db.select().from(authorsTable);
  return res.status(200).json(authors);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const [authors] = await db
    .select()
    .from(authorsTable)
    .where(eq(id, authorsTable.id));
  if (!authors) {
    return res.status(404).json({ error: `Author with ID : ${id} Not Found` });
  }
  return res.status(200).json(authors);
});

router.post("/", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const [result] = await db
    .insert(authorsTable)
    .values({ firstName, lastName, email })
    .returning({ id: authorsTable.id });
  return res.json({ message: `Book Created Succesfully , ID : ${result.id}` });
});

router.get("/:id/books", async (req, res) => {
  const books = await db
    .select()
    .from(booksTable)
    .where(eq(req.params.id, booksTable.authorId));
    return res.json(books)
});

module.exports = router;
