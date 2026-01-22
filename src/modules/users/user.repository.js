const User = require("./user.model");

class UserRepository {
  findByEmail(email) {
    return User.findOne({ email });
  }

  create(data) {
    return User.create(data);
  }

  findAllUsers() {
    return User.find({ role: "user" }).select("-password");
  }

  findOne(id){
        return User.findOne({_id:id})
  }

  updateById(id,data){
    return User.findByIdAndUpdate({_id:id},{ $set: data },{new:true})
  }

  deleteById(id){
    return User.findByIdAndDelete({_id:id})
  }

  updateStatus(id, isActive) {
    return User.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    ).select("-password");
  }
}

module.exports = new UserRepository();
