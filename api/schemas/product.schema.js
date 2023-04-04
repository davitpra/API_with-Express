const Joi=require('joi');

//definimos el tipo de datos
const id=Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

//creamos los schemas y determinamos si son obligatorios.
const createProductSchema=Joi.object({
  name:name.required()
  ,price:price.required(),
  image: image.required()
  });

const updateProductSchema=Joi.object({
  name:name,
  price:price,
  image:image
  });

const getProductSchema=Joi.object({
  id:id.required(),
  });

module.exports={createProductSchema,updateProductSchema,getProductSchema}
