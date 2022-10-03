const Stock = require("../models/Stock");

exports.getStocksServices = async (filters, queries) => {
  const stocks = await Stock.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const totalStocks = await Stock.countDocuments(filters);
  const pageCount = Math.ceil(totalStocks / queries.limit);
  return { totalStocks, pageCount, stocks };
};

exports.createStockServices = async (data) => {
  const stock = await Stock.create(data);
  return stock;
};

exports.updateStockServicesById = async (id, data) => {
  const result = await Stock.updateOne(
    { _id: id },
    { $inc: data },
    { runValidators: true }
  );
  return result;
};
exports.deleteStockServicesById = async (id) => {
  const result = await Stock.deleteOne({ _id: id });
  return result;
};
