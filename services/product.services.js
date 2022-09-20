const Product = require("../models/Product");

exports.getProductsServices = async (filters, queries) => {
  // const products = await Product.where("name")
  //   .equals(/\w/)
  //   .where("quantity")
  //   .gt(100)
  //   .lt(600)
  //   .limit(2)
  //     .sort({ quantity: -1 });
  const products = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const totalProducts = await Product.countDocuments(filters);
  const pageCount = Math.ceil(totalProducts / queries.limit);
  return { totalProducts, pageCount, products };
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

exports.updateProductServicesById = async (productId, data) => {
  const result = await Product.updateOne(
    { _id: productId },
    { $inc: data },
    { runValidators: true }
  );

  // const product = await Product.findById(productId);
  // const result = await product.set(data).save();

  return result;
};

exports.bulkUpdateProductServices = async (data) => {
  // const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });

  const products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });

  const result = await Promise.all(products);
  console.log(result);

  return result;
};

exports.deleteProductServicesById = async (id) => {
  const result = await Product.deleteOne({ _id: id });

  return result;
};

exports.bulkDeleteProductServices = async (ids) => {
  const result = await Product.deleteMany({ _id: ids });

  return result;
};
