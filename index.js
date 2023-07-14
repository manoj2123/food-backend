import express from "express";
import dotenv from "dotenv";
import { recipeRouter } from "./Router/recipe.js";
import { isAuthenticated } from "./Authentication/auth.js";
import { userRouter } from "./Router/user.js";
import cors from "cors";

// Load environment variables
dotenv.config();

// Get the port from environment variables or use a default value
const PORT = process.env.PORT || 9050;

// Create the Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// Recipe routes (requires authentication)
app.use("/recipe", isAuthenticated, recipeRouter);

// User routes
app.use("/user", userRouter);

// Start the server
app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
