const Store = require("../models/Store");

exports.getStoresServices = async () => {
  const stores = await Store.find({}).select("-products -suppliers");
  return stores;
};

exports.createStoreService = async (data) => {
  const store = await Store.create(data);
  return store;
};

exports.getStoreServicesById = async (id) => {
  const store = await Store.findOne({ _id: id });
  return store;
};

exports.updateStoreServicesById = async (id, data) => {
  const result = await Store.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};
