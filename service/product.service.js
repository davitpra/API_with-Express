const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')

class ProductsService {
  constructor () {
    this.products = []
    //cada vez que corra una instancia del servicio, va a generar los productos:
    this.generate ()
  }
  // metodo para generar products con datafake
  generate(){
    const limit=100
    //creamos un ciclo for para los productos
    for(let index=0;index<limit;index++){
      //inyectamos los productos a products
      this.products.push({
        //anadimos un identificador de los productos
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

  find () {
    return this.products
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
