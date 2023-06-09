const express = require('express');

const OrderService = require('../service/order.service');
const validatorHandler = require('../middlewares/validatorHandler');

const passport = require('passport');

const {
	getOrderSchema,
	// createOrderSchema,
  addItemSchema,
  queryProductSchema
} = require('../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

router.get(
  '/',
  validatorHandler(queryProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

router.get(	'/:id',
	validatorHandler(getOrderSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const order = await service.findOne(id);
			res.json(order);
		} catch (error) {
			next(error);
		}
	}
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
	// validatorHandler(createOrderSchema, 'body'),
	async (req, res, next) => {
		try {
      const body = {
        userId: req.user.sub
      };
			const newOrder = await service.create(body);
			res.status(201).json({ newOrder });
		} catch (error) {
			next(error);
		}
	}
);

router.post(
  '/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
