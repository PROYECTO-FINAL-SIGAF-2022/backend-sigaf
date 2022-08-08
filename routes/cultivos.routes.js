import { Router } from 'express';
import {
  deleteCultivo,
  getCultivos,
  getCultivoUnico,
  postCultivo,
  updateCultivo,
} from '../controllers/cultivos.controllers.js';
const router = Router();

router.get('/api/get-cultivos', getCultivos);

router.get('/api/get-cultivo/:id', getCultivoUnico);

router.post('/api/post-cultivo', postCultivo);

router.put('/api/edit-cultivo/:id', updateCultivo);

router.delete('/api/delete-cultivo/:id', deleteCultivo);

export default router;
