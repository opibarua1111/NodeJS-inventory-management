const {
  createProductServices,
  getProductsServices,
  updateProductServicesById,
  bulkUpdateProductServices,
  deleteProductServicesById,
  bulkDeleteProductServices,
} = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
  try {
    let filters = { ...req.query };

    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    // gt, lt, gte, lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt| gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filtersString);

    const queries = {};

    if (req.query.sort) {
      // price,quantity -> 'price quantity'
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

    const products = await getProductsServices(filters, queries);
    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const result = await createProductServices(req.body);

    result.logger();

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

exports.updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductServicesById(id, req.body);

    res.status(200).json({
      status: "success",
      message: "Updated the product successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could't update the product",
      error: error.message,
    });
  }
};

exports.bulkUpdateProducts = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductServices(req.body);

    res.status(200).json({
      status: "success",
      message: "Updated the product successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could't update the products",
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProductServicesById(id);

    res.status(200).json({
      status: "success",
      message: "deleted the product successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could't deleted the product",
      error: error.message,
    });
  }
};

exports.bulkDeleteProducts = async (req, res, next) => {
  try {
    const result = await bulkDeleteProductServices(req.body.ids);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "fail",
        message: "Could't Deleted the products",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Deleted the product successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could't Deleted the products",
      error: error.message,
    });
  }
};
