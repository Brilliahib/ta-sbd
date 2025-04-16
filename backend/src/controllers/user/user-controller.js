const userService = require("../../services/user/user-service");
const { successResponse, errorResponse } = require("../../utils/meta");

const createUser = async (req, res) => {
  try {
    const data = await userService.createUser(req.body);
    return res
      .status(201)
      .json(successResponse(data, "User created successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const data = await userService.getUserByEmail(email);
    if (!data) {
      return res.status(404).json(errorResponse(null, "User not found"));
    }
    return res.status(200).json(successResponse(data, "User found by email"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const getDetailUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await userService.getUserById(id);
    if (!data) {
      return res.status(404).json(errorResponse(null, "User not found"));
    }
    return res
      .status(200)
      .json(successResponse(data, "Detail user retrieved successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const getUserProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await userService.getProductUser(id);
    return res
      .status(200)
      .json(successResponse(data, "User products retrieved successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await userService.deleteUser(id);
    return res
      .status(200)
      .json(successResponse(data, "User deleted successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await userService.updateUser(id, { data: req.body });
    return res
      .status(200)
      .json(successResponse(data, "User updated successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const getAllUsers = async (req, res) => {
  try {
    const data = await userService.getAllUsers();
    return res
      .status(200)
      .json(successResponse(data, "All users retrieved successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getDetailUser,
  getUserProducts,
  deleteUser,
  updateUser,
  getAllUsers,
};
