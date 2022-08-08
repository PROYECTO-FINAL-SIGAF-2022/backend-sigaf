import { Router } from 'express';
import {
  deleteHistorial,
  getHistoriales,
  getHistorialUnico,
  postHistorial,
  updateHistorial,
} from '../controllers/historialesParcelasCultivos.controllers.js';
const router = Router();

router.get('/api/get-historiales', getHistoriales);

router.get('/api/get-historial/:id', getHistorialUnico);

router.post('/api/post-historial', postHistorial);

router.put('/api/edit-historial/:id', updateHistorial);

router.delete('/api/delete-historial/:id', deleteHistorial);

export default router;
