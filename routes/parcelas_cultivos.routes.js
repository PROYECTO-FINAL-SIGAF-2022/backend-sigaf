import { Router } from 'express';
import { deleteParcela_Cultivo, getParcela_Cultivos, getParcela_CultivoUnico, postParcela_Cultivo, updateParcela_Cultivo } from '../controllers/parcelas_cultivos.controllers.js';
const router = Router()




router.get('/api/get-parcelas-cultivos',getParcela_Cultivos)

router.get('/api/get-parcelas-cultivos/:id',getParcela_CultivoUnico	)

router.post('/api/post-parcelas-cultivos',postParcela_Cultivo)

router.put('/api/edit-parcelas-cultivos/:id',updateParcela_Cultivo)

router.delete('/api/delete-parcelas-cultivos/:id',deleteParcela_Cultivo)

export default router;