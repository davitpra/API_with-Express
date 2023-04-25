const Joi = require('joi');

const id = Joi.number().integer()
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const getOrderSchema = Joi.object({
	id: id.required(),
})

const createOrderSchema = Joi.object({
	customerId: customerId.required(),
});

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
});

module.exports = {
	getOrderSchema,
	createOrderSchema,
  addItemSchema,
  queryProductSchema
}
