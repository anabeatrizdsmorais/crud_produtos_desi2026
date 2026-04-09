const express = require('express');
const routerProduct = express.Router();

const { getProdutos, adicionarProduto, editarProduto, deletarProduto } = require('../controller/produtoController.js');

routerProduct.get('/produto', getProdutos);
routerProduct.post('/produto', adicionarProduto);
routerProduct.patch('/produto/:id', editarProduto);
routerProduct.delete('/produto/:id', deletarProduto);


module.exports = routerProduct;