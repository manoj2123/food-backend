import express from "express";
import {
  getAllRecipe,
  getRecipeById,
  addRecipeData,
  updateRecipeData,
  deleteRecipeData
} from "../controllers/recipe.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const recipes = await getAllRecipe(req);
    console.log(recipes);

    if (!recipes) {
      return res.status(400).json({ data: "Recipes not found" });
    }

    res.status(200).json({ data: recipes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await getRecipeById(id);

    if (!recipe) {
      return res.status(400).json({ data: "Recipe not found" });
    }

    res.status(200).json({ data: recipe });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal server error" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const newRecipe = req.body;

    if (!newRecipe) {
      return res.status(400).json({ data: "No recipe details provided" });
    }

    const result = await addRecipeData(newRecipe);
    res.status(200).json({ result: result, message: "New recipe added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal server error" });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (!id || !updatedData) {
      return res.status(400).json({ message: "No recipe data provided for update" });
    }

    const result = await updateRecipeData(id, updatedData);
    res.status(200).json({ result: result, message: "Recipe updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ data: "Wrong recipe ID" });
    }

    const result = await deleteRecipeData(id);
    res.status(200).json({ data: { result: result, message: "Deleted successfully" } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal server error" });
  }
});

export const recipeRouter = router;
