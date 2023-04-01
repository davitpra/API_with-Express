
const express = require("express");
const ProductsService = require('../service/product.service')


// creamos un router
const router = express.Router()

// iniciamos una instacia del servicio
const service = new ProductsService()

// ahora la ruta en lugar de ser /products va a ser /
router.get('/', (req, res) => {
 const products = service.find()
  res.json(products)
})

// enviamos un archivo JSON
router.get("/", (req, res) =>{
  res.json([{
      name: 'Laptop Gamer',
      price: 23000,
  },
  {
      name: 'iPhone X3',
      price: 32000,
  }
  ]);
});

//añadimos una ruta dinámica.
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id)
  res.status(200).json(product);
});

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body)
  res.status(201).json(newProduct)
});

// el metodo patch necesita un id
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.update(id, body)
  res.status(201).json(product)
});

// el metodo delete necesita un id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const message = service.delete(id)
  res.json(message);
});

// exportamos el router
module.exports = router
