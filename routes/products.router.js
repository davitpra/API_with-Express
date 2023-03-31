
const express = require("express");
const { faker } = require('@faker-js/faker');

// creamos un router
const router = express.Router()

// ahora la ruta en lugar de ser /products va a ser /
router.get('/', (req, res) => {
  const products = []
  const { size } = req.query
  const limit    = parseInt(size) || 10

  for (let index = 0; index < limit; index++) {
      products.push({
          name:  faker.commerce.productName(),
          price: parseInt(faker.commerce.price(), 10),
          image: faker.image.imageUrl(),
      })
  }

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
  // obtenemos el ide con req.parmas
  const { id } = req.params;
  res.json({
      id,
      name: 'iPhone X3',
      price: 32000,
  });
});
// exportamos el router
module.exports = router
