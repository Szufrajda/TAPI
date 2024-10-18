import express from 'express';
import {
    getAllPerfumes,
    getPerfumeById,
    createPerfume,
    updatePerfume,
    replacePerfume,    
    deletePerfume
} from '../controllers/perfumeController.js';

const router = express.Router();

router.get('/', getAllPerfumes);          // GET /api/perfumes
router.get('/:id', getPerfumeById);       // GET /api/perfumes/:id
router.post('/', createPerfume);          // POST /api/perfumes
router.patch('/:id', updatePerfume);      // PATCH /api/perfumes/:id
router.put('/:id', replacePerfume);       // PUT /api/perfumes/:id
router.delete('/:id', deletePerfume);     // DELETE /api/perfumes/:id

export default router;
