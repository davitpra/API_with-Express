
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
if (id === '999') {
  res.status(404).json({
    message: "notfound"
  })
} else {
  res.status(200).json({
      id,
      name: 'iPhone X3',
      price: 32000,
  });
}

});

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body
  });
});

// el metodo patch necesita un id
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id,
  });
});
// el metodo delete necesita un id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'deleted',
    id,
  });
});

// exportamos el router
module.exports = router
