import express, { Request, Response } from 'express';
import { UserModel } from "@/utils/models/userModel";
import { dbConnect } from "@/utils/db";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  await dbConnect();

  try {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const newUser = await UserModel.create({ name, email, age });
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user", error });
  }
});

export default router;
