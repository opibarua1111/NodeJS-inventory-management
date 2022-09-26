const Brand = require("../models/Brand");

exports.getBrandsServices = async () => {
  const brands = await Brand.find({}).select("-products -suppliers");
  return brands;
};

exports.createBrandService = async (data) => {
  const brand = await Brand.create(data);
  return brand;
};

exports.getBrandServicesById = async (id) => {
  const brand = await Brand.findOne({ _id: id });
  return brand;
};

exports.updateBrandServicesById = async (id, data) => {
  const result = await Brand.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};
