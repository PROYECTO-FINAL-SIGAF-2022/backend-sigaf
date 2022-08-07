import { Router } from 'express';
import { deleteParcela, getParcelas, getParcelaUnico, postParcela, updateParcela } from '../controllers/parcela.controllers.js';
const router = Router()




router.get('/api/get-parcelas',getParcelas)

router.get('/api/get-parcela/:id',getParcelaUnico)

router.post('/api/post-parcela',postParcela)

router.put('/api/edit-parcela/:id',updateParcela)

router.delete('/api/delete-parcela/:id',deleteParcela)

export default router;