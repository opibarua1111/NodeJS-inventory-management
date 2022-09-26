const {
  createBrandService,
  getBrandsServices,
  getBrandServicesById,
  updateBrandServicesById,
} = require("../services/brand.services");

exports.getBrands = async (req, res, next) => {
  try {
    const brands = await getBrandsServices();
    res.status(200).json({
      status: "success",
      data: brands,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);
    console.log(result);
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

exports.getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await getBrandServicesById(id);
    if (!brand) {
      res.status(400).json({
        status: "fail",
        message: "Could't find a brand with this is",
      });
    }
    res.status(200).json({
      status: "success",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could't update the Brand",
      error: error.message,
    });
  }
};
exports.updateBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateBrandServicesById(id, req.body);

    if (!result.modifiedCount) {
      res.status(400).json({
        status: "fail",
        message: "Could't Update a brand with this id",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Updated the brand successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could't update the Brand",
      error: error.message,
    });
  }
};
