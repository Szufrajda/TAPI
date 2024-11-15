import express from 'express';
import {
    getAllPerfumes,
    getPerfumeById,
    createPerfume,
    updatePerfume,
    replacePerfume,
    deletePerfume
} from '../controllers/perfumeController.js';

import {
    getAllScentNotes,
    getScentNoteById,
    createScentNote,
    updateScentNote,
    deleteScentNote
} from '../controllers/scentNoteController.js';

import {
    getAllIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient
} from '../controllers/ingredientController.js';

const router = express.Router();

// Perfumy
router.get('/perfumy', getAllPerfumes);                // GET wszystkie perfumy
router.get('/perfumy/:id', getPerfumeById);             // GET pojedynczy perfum po ID
router.post('/perfumy', createPerfume);                 // POST dodanie perfumu
router.patch('/perfumy/:id', updatePerfume);            // PATCH aktualizacja perfumu po ID
router.put('/perfumy/:id', replacePerfume);             // PUT pełna aktualizacja po ID
router.delete('/perfumy/:id', deletePerfume);           // DELETE usunięcie po ID

// Nuty zapachowe
router.get('/nuty-zapachowe', getAllScentNotes);        // GET wszystkie nuty zapachowe
router.get('/nuty-zapachowe/:id', getScentNoteById);    // GET pojedyncza nuta zapachowa po ID
router.post('/nuty-zapachowe', createScentNote);        // POST dodanie nowej nuty zapachowej
router.patch('/nuty-zapachowe/:id', updateScentNote);   // PATCH aktualizacja nuty zapachowej po ID
router.delete('/nuty-zapachowe/:id', deleteScentNote);  // DELETE usunięcie nuty zapachowej po ID

// Składniki
router.get('/skladniki', getAllIngredients);            // GET wszystkie składniki
router.get('/skladniki/:id', getIngredientById);        // GET pojedynczy składnik po ID
router.post('/skladniki', createIngredient);            // POST dodanie nowego składnika
router.patch('/skladniki/:id', updateIngredient);       // PATCH aktualizacja składnika po ID
router.delete('/skladniki/:id', deleteIngredient);      // DELETE usunięcie składnika po ID


export default router;
