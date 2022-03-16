const { MOrderItem, MProduct, MOrder } = require("../models");

/**
 * body
 *  items
 *    [{item: slug, quantity: 2}]
 *
 */
async function Purchase(req, res) {
  try {
    const { items } = req.body;

    const listItems = [];
    let total = 0;

    for (let x of items) {
      const searchQuery = { $or: [{ slug: x.item }, { id: x.item }] };
      const product = await MProduct.findOne(searchQuery);
      total += (product.price / 100) * x.quantity;

      const { id } = await MOrderItem.create(x);
      listItems.push(id);
    }

    const order = {
      client: req.user.user,
      items: listItems,
      total: total * 100,
      status: 1,
    };

    await MOrder.create(order);

    return res.status(201).send();
  } catch (error) {
    return res.status(500).json({ err: "internal server error" });
  }
}

async function CheckStatus(req, res) {
  try {
    const { id } = req.params;
    const searchQuery = { $or: [{ id }, { slug: id }] };

    const order = await MOrder.findOne(searchQuery);

    const orderItems = [];

    for (let x of order.items) {
      const productOrder = await MOrderItem.findById(x);
      productOrder.price = productOrder.price / 100;
      orderItems.push(productOrder);
    }

    order.total = order.total / 100;
    order.items = orderItems;

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ err: "internal server error" });
  }
}

async function allOrders(req, res) {
  try {
    const orders = await MOrder.find();
    const sendOrders = [];

    for (let x of orders) {
      const orderItems = [];

      for (let y of x.items) {
        let searchQuery = { $or: [{ slug: y }, { id: y }] };
        const { quantity, item } = await MOrderItem.findOne(searchQuery);

        searchQuery = { $or: [{ slug: item }, { id: item }] };
        let { title, price } = await MProduct.findOne(searchQuery);

        price = price / 100;

        orderItems.push({ quantity, title, price });
      }

      sendOrders.push({
        client: x.client,
        items: orderItems,
        status: x.status,
        total: x.total / 100,
      });
    }

    return res.status(200).json(sendOrders);
  } catch (error) {
    return res.status(500).json({ err: "internal server errror" });
  }
}

module.exports = {
  Purchase,
  CheckStatus,
  allOrders,
};
