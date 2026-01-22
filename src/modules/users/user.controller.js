
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const userService = require("./user.service");

exports.createUser = asyncHandler(async (req, res) => {
  const adminId = req.user.id;
  const data = await userService.createUser(req.body, adminId);
  console.log("user data",data);
  
  res.status(200).json(new ApiResponse(201, data, "User created successfully"));
});

exports.getUsers = asyncHandler(async (req, res) => {
  const data = await userService.listUsers();
  res.status(200).json(new ApiResponse(200, data, "User fetched successfully"));
});

exports.updateUsers = asyncHandler(async (req, res) => {
    const { id } = req.params;
  const data = await userService.updateUsers(id, req.body);
  res.status(201).json(new ApiResponse(200, data, "User updated successfully"));
});


exports.deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
  const data = await userService.deleteUser(id);
  res.status(200).json(new ApiResponse(200, data, "User deleted successfully"));
});


exports.toggleUserStatus = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const user = await userService.toggleUserStatus(id);

  res.status(200).json(new ApiResponse(200,user,`User ${user.isActive ? "activated" : "deactivated"} successfully`));
});



exports.getMyProfile = asyncHandler(async (req, res) => {
  const id = req.user.id
  const data = await userService.getMyProfile(id);
  res.status(200).json(new ApiResponse(200, data, "User profile fetched successfully"));
});