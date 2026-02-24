import { Router } from 'express';
const router = Router();

import { getProdutos } from '../controllers/produtoController.js';

router.get('/produto', getProdutos);


export default router;