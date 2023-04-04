
const express = require("express");
const ProductsService = require('../service/product.service')

const validatorHandler = require('./../middlewares/validator.handler');
const{
  createProductSchema,
  updateProductSchema,
  getProductSchema
} = require('./../schemas/product.schema')

// creamos un router
const router = express.Router()

// iniciamos una instacia del servicio
const service = new ProductsService()

// ahora la ruta en lugar de ser /products va a ser /
router.get('/', async (req, res) => {
 const products = await service.find()
  res.json(products)
})


router.get('/:id',
  // validamos el id de los params
  validatorHandler (getProductSchema, "params"),
  //obtenemos la informacion con el id
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id)
      res.status(200).json(product);
    } catch(error) {
      next (error)
    }
  }
);

router.post('/',
  // valido que sea un producto como lo definimos
  validatorHandler (createProductSchema, "body"),
  //hacemos el post
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body)
    res.status(201).json(newProduct)
  }
);

// el metodo patch necesita un id
router.patch('/:id',
  // validamos el id
  validatorHandler (getProductSchema, "params"),
  // validamos el update
  validatorHandler (updateProductSchema, "body"),
  // hacemos la actualizacion
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body)
      res.status(201).json(product)
    } catch(error){
      next (error)
    }
  }
);

// el metodo delete necesita un id
router.delete('/:id',async (req, res) => {
  const { id } = req.params;
  const message = await service.delete(id)
  res.json(message);
});

// exportamos el router
module.exports = router
