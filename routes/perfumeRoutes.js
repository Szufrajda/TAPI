import express from 'express';
import {
    getAllPerfumes,
    getPerfumeById,
    getPerfumesByScentNoteTypeAndGroup,
    createPerfume,
    updatePerfume,
    replacePerfume,
    deletePerfume
} from '../controllers/perfumeController.js';

const router = express.Router();

router.get('/', getAllPerfumes);                    // GET wszystkie lub pojedynczy z ?id=
router.get('/nuty', getPerfumesByScentNoteTypeAndGroup); // Dla nut zapachowych
router.post('/', createPerfume);                    // POST
router.patch('/', updatePerfume);                   // PATCH z ?id=
router.put('/', replacePerfume);                    // PUT z ?id=
router.delete('/', deletePerfume);                  // DELETE z ?id=


export default router;
