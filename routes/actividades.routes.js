import { Router } from 'express';
import { deleteActividad, getActividades, getActividadUnico, postActividad, updateActividad } from '../controllers/actividades.controllers.js';
const router = Router()




router.get('/api/get-actividades',getActividades)

router.get('/api/get-actividad/:id',getActividadUnico)

router.post('/api/post-actividad',postActividad)

router.put('/api/edit-actividad/:id',updateActividad)

router.delete('/api/delete-actividad/:id',deleteActividad)

export default router;