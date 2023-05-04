const boom = require('@hapi/boom');

const { models } = require('./../libs/squelize');
const { Op } = require('sequelize')

class OrderService {
	constructor() {
	}

	async create(data) {
    // Accedemos al modelo Customer y usando where encadenamos hacia user
    const customer = await models.Customer.findAll({
      where: {
        '$user.id$': data.userId
      },
      include: ['user']
    });
    // Validamos que exista el customer
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    // Creamos un objeto con el customerId obtenido de la consulta
    const dataOrder = {
      customerId: customer[0].id
    };
    const newOrder = await models.Order.create(dataOrder);
    return newOrder;
  }

  async find(query) {
    const options = {
      include: ['category'],
    };

    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;
    if (price) {
      options.where.price = price;
    }

    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }
    const products = await models.Product.findAll(options);
    return products;
  }

	async findOne(id) {
		const order = await models.Order.findByPk(id, {
			include: [
				{
					association: 'customer',
					include: ['user'],
				},
        'items'
			],
		});
		return order;
	}

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId,
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
      ],
    });
    return orders;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

	async update(id, changes) {
		return {
			id,
			changes,
		};
	}

	async delete(id) {
		return { id };
	}
}

module.exports = OrderService;
