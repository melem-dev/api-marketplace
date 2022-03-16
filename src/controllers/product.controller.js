const { hash } = require("../utils");
const { MProduct } = require("../models");

async function Create(req, res) {
  try {
    let { title, price } = req.body;
    if (!title || !price)
      return res.status(404).json({ err: "invalid fields" });

    const hashId = hash(5, true);
    const slug = title.toLowerCase().split(" ").join("-") + "-" + hashId;
    price = price * 100;

    await MProduct.create({ title, price, slug });

    return res.status(201).send();
  } catch (error) {
    return res.status(500).json({ err: "internal server error" });
  }
}

async function readAll(req, res) {
  try {
    const allProducts = await MProduct.find();

    const sendProducts = [];

    if (allProducts.length > 0) {
      for (let product of allProducts) {
        product.price = product.price / 100;
        sendProducts.push(product);
      }
    }

    return res.status(200).json(sendProducts);
  } catch (error) {
    return res.status(500).json({ err: "internal server error" });
  }
}

async function readDetails(req, res) {
  try {
    let product;
    const { id } = req.params;

    product = await MProduct.findOne({ slug: id });

    if (!product) {
      product = await MProduct.findById(id);
    }

    product.price = product.price / 100;

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ err: "internal server error" });
  }
}

async function Update(req, res) {
  try {
    const { id } = req.params;

    const searchOptions = [{ slug: id }, { id }];

    if (req.body.price) {
      req.body.price = req.body.price * 100;
    }

    await MProduct.findOneAndUpdate({ $or: searchOptions }, req.body);

    return res.status(200).send();
  } catch (error) {
    return res.status(500).json({ err: "internal server error" });
  }
}

async function Delete(req, res) {
  try {
    const { id } = req.params;

    const searchOptions = [{ slug: id }, { id }];

    await MProduct.findOneAndDelete({ $or: searchOptions });

    return res.status(200).send();
  } catch (error) {
    return res.status(500).json({ err: "internal server error" });
  }
}

module.exports = {
  Create,
  readAll,
  readDetails,
  Update,
  Delete,
};
