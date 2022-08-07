import { Router } from 'express';
import { deleteTipo_Usuario, getTipo_usuarios, getTipo_UsuarioUnico, postTipo_Usuario } from '../controllers/tipo_usuario.controllers.js';
const router = Router()




router.get('/api/get-tipo-user',getTipo_usuarios)

router.get('/api/get-tipo-user/:id',getTipo_UsuarioUnico)

router.post('/api/post-tipo-user',postTipo_Usuario)

router.put('/api/edit-tipo-user/:id',postTipo_Usuario)

router.delete('/api/delete-tipo-user/:id',deleteTipo_Usuario)

export default router;