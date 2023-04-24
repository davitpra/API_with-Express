const Joi=require('joi');

//definimos el tipo de datos
const id=Joi.number().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId=Joi.number().integer();

//creamos los schemas y determinamos si son obligatorios.
const createProductSchema=Joi.object({
  name:name.required(),
  price:price.required(),
  description:description.required(),
  image: image.required(),
  categoryId:categoryId.required()
  });

const updateProductSchema=Joi.object({
  name:name,
  price:price,
  image:image,
  description,
  categoryId
  });

const getProductSchema=Joi.object({
  id:id.required(),
  });

module.exports={createProductSchema,updateProductSchema,getProductSchema}
