const {
  getSupplierServices,
  createSupplierService,
  getSupplierServicesById,
  updateSupplierServicesById,
} = require("../services/supplier.services");

exports.getSuppliers = async (req, res, next) => {
  try {
    const supplier = await getSupplierServices();
    res.status(200).json({
      status: "success",
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.createSupplier = async (req, res, next) => {
  try {
    const result = await createSupplierService(req.body);
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

exports.getSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await getSupplierServicesById(id);
    if (!supplier) {
      res.status(400).json({
        status: "fail",
        message: "Could't find a supplier with this id",
      });
    }
    res.status(200).json({
      status: "success",
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could't update the supplier",
      error: error.message,
    });
  }
};

exports.updateSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateSupplierServicesById(id, req.body);
    if (!result.modifiedCount) {
      res.status(400).json({
        status: "fail",
        message: "Could't Update a supplier with this is",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Updated the supplier successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could't update the supplier",
      error: error.message,
    });
  }
};
