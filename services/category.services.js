const Category = require("../models/Category");

exports.getCategoriesServices = async () => {
  const brands = await Category.find({}).select("-products -suppliers");
  return brands;
};

exports.createCategoryService = async (data) => {
  const brand = await Category.create(data);
  return brand;
};

exports.getCategoryServicesById = async (id) => {
  const brand = await Category.findOne({ _id: id });
  return brand;
};

exports.updateCategoryServicesById = async (id, data) => {
  const result = await Category.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};
