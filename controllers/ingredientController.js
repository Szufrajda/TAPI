import fs from 'fs';
import perfumesData from '../data/perfumes.json' assert { type: "json" };

let ingredients = perfumesData.skladniki;

export const getAllIngredients = (req, res) => {
    res.json(ingredients);
};

export const getIngredientById = (req, res) => {
    const id = Number(req.params.id);
    const ingredient = ingredients.find(ing => ing.id === id);

    if (ingredient) {
        res.json(ingredient);
    } else {
        res.status(404).json({ message: "Nie znaleziono składnika" });
    }
};

export const createIngredient = (req, res) => {
    const newIngredient = {
        id: ingredients.length + 1,
        ...req.body
    };

    ingredients.push(newIngredient);
    fs.writeFileSync('data/perfumes.json', JSON.stringify({ ...perfumesData, skladniki: ingredients }, null, 2));
    res.status(201).json(newIngredient);
};

export const updateIngredient = (req, res) => {
    const id = Number(req.params.id);
    const ingredient = ingredients.find(ing => ing.id === id);

    if (ingredient) {
        Object.assign(ingredient, req.body);
        fs.writeFileSync('data/perfumes.json', JSON.stringify({ ...perfumesData, skladniki: ingredients }, null, 2));
        res.json(ingredient);
    } else {
        res.status(404).json({ message: "Nie znaleziono składnika" });
    }
};

export const deleteIngredient = (req, res) => {
    const id = Number(req.params.id);
    const index = ingredients.findIndex(ing => ing.id === id);

    if (index !== -1) {
        ingredients.splice(index, 1);
        fs.writeFileSync('data/perfumes.json', JSON.stringify({ ...perfumesData, skladniki: ingredients }, null, 2));
        res.status(204).end();
    } else {
        res.status(404).json({ message: "Nie znaleziono składnika" });
    }
};
