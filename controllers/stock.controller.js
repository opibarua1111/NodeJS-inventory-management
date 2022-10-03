const {
  getStocksServices,
  createStockServices,
  updateStockServicesById,
  deleteStockServicesById,
} = require("../services/stock.services");

exports.getStocks = async (req, res, next) => {
  try {
    let filters = { ...req.query };

    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt| gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filtersString);

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }
    if (req.query.fields) {
      // price,quantity -> 'price quantity'
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }
    //pagination
    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const stocks = await getStocksServices(filters, queries);
    res.status(200).json({
      status: "success",
      data: stocks,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.createStock = async (req, res, next) => {
  try {
    const result = await createStockServices(req.body);

    res.status(200).json({
      status: "success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};

exports.updateStockById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateStockServicesById(id, req.body);

    res.status(200).json({
      status: "success",
      message: "Updated the Stock successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could't update the Stock",
      error: error.message,
    });
  }
};

exports.deleteStockById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteStockServicesById(id);

    res.status(200).json({
      status: "success",
      message: "deleted the Stock successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could't deleted the Stock",
      error: error.message,
    });
  }
};
