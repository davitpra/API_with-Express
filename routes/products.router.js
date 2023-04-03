
const express = require("express");
const ProductsService = require('../service/product.service')


// creamos un router
const router = express.Router()

// iniciamos una instacia del servicio
const service = new ProductsService()

// ahora la ruta en lugar de ser /products va a ser /
router.get('/', async (req, res) => {
 const products = await service.find()
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
router.get('/:id',async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id)
    res.status(200).json(product);
  } catch(error) {
    next (error)
  }
});

router.post('/',async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body)
  res.status(201).json(newProduct)
});

// el metodo patch necesita un id
router.patch('/:id',async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body)
    res.status(201).json(product)
  } catch(e){
    res.status(404).json({
      message: e.message
    })
  }
});

// el metodo delete necesita un id
router.delete('/:id',async (req, res) => {
  const { id } = req.params;
  const message = await service.delete(id)
  res.json(message);
});

// exportamos el router
module.exports = router
