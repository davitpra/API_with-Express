const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')

const pool = require('../libs/postgres.pool')

class ProductsService {
  constructor () {
    this.products = []
    this.generate ()
    //creamos la coneccion dentro del constructor
    this.pool= pool
    //escuchamos si hay algun error
    this.pool.on('error', (error)=> console.error(error))
  }
  generate(){
    const limit=100
    for(let index=0;index<limit;index++){
      this.products.push({
        id:faker.datatype.uuid(),
        name:faker.commerce.productName(),
        price:parseInt(faker.commerce.price(),10),
        image:faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  create (data) {
    const newProduct={
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct
  }

  async find () {
    // creamos una query
    const query = 'SELECT * FROM task'
    // esperamos la respuesta de la DB
    const rta = await this.pool.query(query)
    return rta.rows
  }

  findOne(id) {
    const product = this.products.find(item => item.id === id)
    if (!product) {
      throw boom.notFound('Product Not Found')
    }
    if (product.isBlock) {
      throw boom.conflict('product is block')
    }
    return product
  }

  update(id, changes){
    const index = this.products.findIndex(item => item.id ===id)
    if (index === -1) {
      throw boom.notFound('Product Not Found')
    }
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index]
  }

  delete (id) {
    const index = this.products.findIndex(item => item.id ===id)
    if (index === -1) {
      throw boom.notFound('Product Not Found')
    }
    this.products.splice(index,1)
    return {message:true, id}
  }
}

module.exports = ProductsService
