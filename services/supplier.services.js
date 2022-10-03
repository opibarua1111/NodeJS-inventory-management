const Supplier = require("../models/Supplier");

exports.getSupplierServices = async () => {
  const supplier = await Supplier.find({});
  return supplier;
};

exports.createSupplierService = async (data) => {
  const supplier = await Supplier.create(data);
  return supplier;
};

exports.getSupplierServicesById = async (id) => {
  const supplier = await Supplier.findOne({ _id: id });
  return supplier;
};

exports.updateSupplierServicesById = async (id, data) => {
  const result = await Supplier.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};
