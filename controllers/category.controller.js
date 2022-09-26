const {
  createCategoryService,
  getCategoriesServices,
  getCategoryServicesById,
  updateCategoryServicesById,
} = require("../services/category.services");

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await getCategoriesServices();
    res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const result = await createCategoryService(req.body);
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

exports.getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await getCategoryServicesById(id);
    if (!category) {
      res.status(400).json({
        status: "fail",
        message: "Could't find a category with this is",
      });
    }
    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could't update the Category",
      error: error.message,
    });
  }
};
exports.updateCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateCategoryServicesById(id, req.body);
    if (!result.modifiedCount) {
      res.status(400).json({
        status: "fail",
        message: "Could't Update a category with this id",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Updated the category successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could't update the Category",
      error: error.message,
    });
  }
};
