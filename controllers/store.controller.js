const {
  getStoresServices,
  createStoreService,
  getStoreServicesById,
  updateStoreServicesById,
} = require("../services/store.services");

exports.getStores = async (req, res, next) => {
  try {
    const stores = await getStoresServices();
    res.status(200).json({
      status: "success",
      data: stores,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.createStore = async (req, res, next) => {
  try {
    const result = await createStoreService(req.body);
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

exports.getStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const store = await getStoreServicesById(id);
    if (!store) {
      res.status(400).json({
        status: "fail",
        message: "Could't find a store with this id",
      });
    }
    res.status(200).json({
      status: "success",
      data: store,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could't update the store",
      error: error.message,
    });
  }
};

exports.updateStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateStoreServicesById(id, req.body);
    if (!result.modifiedCount) {
      res.status(400).json({
        status: "fail",
        message: "Could't Update a store with this is",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Updated the store successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could't update the store",
      error: error.message,
    });
  }
};
