import express from "express";
import db from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";

const router = express.Router();

//returns which user in logged in
router.get("/", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await db
    .select({
      email: usersTable.email,
    })
    .from(usersTable)
    .where((table) => eq(table.email, email));

  if (existingUser) {
    return res
      .status(400)
      .json({ error: `User with email ${email} already exists` });
  }

  await db.insert(usersTable).values({
    name,email,
  })

});

//signup
router.post("/signup");

//login
router.post("/login");

export default router;
