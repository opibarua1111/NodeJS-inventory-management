const Product = require("../models/Product");

exports.getProductsServices = async () => {
  // const products = await Product.where("name")
  //   .equals(/\w/)
  //   .where("quantity")
  //   .gt(100)
  //   .lt(600)
  //   .limit(2)
  //     .sort({ quantity: -1 });
  const products = await Product.find({});
  return products;
};

exports.createProductServices = async (data) => {
  // const product = new Product(req.body);

  //instance --> Do something -> save()
  // if (product.quantity == 0) {
  //   product.status = "out-of-stock";
  // }

  // const result = await product.save();
  const product = await Product.create(data);
  return product;
};
