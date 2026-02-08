const Franchise = require("./franchise.model");
const ApiError = require("../utils/ApiError");

class FranchiseService {
  async create(data) {
    return Franchise.create(data);
  }

  async update(id, data) {
    const franchise = await Franchise.findById(id);

    if (!franchise) {
      throw new ApiError(404, "Franchise not found");
    }

    Object.assign(franchise, data);
    await franchise.save();

    return franchise;
  }

  async getAll({ city, isActive }) {
    const query = {};

    if (city) query.city = city;
    if (isActive !== undefined) query.isActive = isActive;

    return Franchise.find(query).sort({ createdAt: -1 });
  }

  async getActive() {
    return Franchise.find({ isActive: true }).sort({ city: 1 });
  }

  async getById(id) {
    const franchise = await Franchise.findById(id);

    if (!franchise) {
      throw new ApiError(404, "Franchise not found");
    }

    return franchise;
  }

  async toggleStatus(id) {
    const franchise = await Franchise.findById(id);

    if (!franchise) {
      throw new ApiError(404, "Franchise not found");
    }

    franchise.isActive = !franchise.isActive;
    await franchise.save();

    return franchise;
  }


  async deleteFranchise(id) {
  const franchise = await Franchise.findByIdAndDelete(id);

  if (!franchise) {
    throw new ApiError(404, "Franchise not found");
  }

  return {
    message: "Franchise permanently deleted",
    id: franchise._id,
  };
}

}

module.exports = new FranchiseService();
