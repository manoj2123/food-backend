import express from "express";
import bcrypt from "bcrypt";
import { addUser, generateJwtToken, getUser } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const user = await getUser(req.body.email);

    if (!user) {
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const hashedUser = { ...req.body, password: hashedPassword };
      const result = await addUser(hashedUser);
      return res.status(200).json({ result, data: "Added successfully" });
    }

    res.status(400).json({ data: "Given email already exists" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body)
    const user = await getUser(req.body.email);

    if (!user) {
      return res.status(404).json({ data: "Invalid email" });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      return res.status(400).json({ data: "Invalid password" });
    }

    const token = generateJwtToken(user._id);
    res.status(200).json({
       
        message: "Successfully logged in",
        token: token
      
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal server error" });
  }
});

export const userRouter = router;
