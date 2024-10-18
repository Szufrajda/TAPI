import express from 'express';
import {
    getAllPerfumes,
    getPerfumeById,
    getPerfumesByScentNoteTypeAndGroup,  // Nowa funkcja kontrolera
    createPerfume,
    updatePerfume,
    replacePerfume,
    deletePerfume
} from '../controllers/perfumeController.js';  // Importujemy kontrolery

const router = express.Router();

// Definicje tras dla operacji CRUD
router.get('/', getAllPerfumes);          // GET /perfumy - pobranie wszystkich perfum
router.get('/:id', getPerfumeById);       // GET /perfumy/:id - pobranie perfumu po ID
router.get('/nuty/:typ/:grupa', getPerfumesByScentNoteTypeAndGroup); // Nowa trasa do potrójnego zagnieżdżenia
router.post('/', createPerfume);          // POST /perfumy - dodanie nowego perfumu
router.patch('/:id', updatePerfume);      // PATCH /perfumy/:id - częściowa aktualizacja perfumu
router.put('/:id', replacePerfume);       // PUT /perfumy/:id - pełna aktualizacja perfumu
router.delete('/:id', deletePerfume);     // DELETE /perfumy/:id - usunięcie perfumu

export default router;
