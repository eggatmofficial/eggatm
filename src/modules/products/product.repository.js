const Product = require("./product.model");

class ProductRepository {
  create(data) {
    return Product.create(data);
  }

  findAll() {
    return Product.find({ isActive: true });
  }
  
  findAllByAdmin() {
    return Product.find(); 
  }
  
  findOne(id){
    return Product.findOne({_id:id})
  }

//   findById(id) {
//     return Product.findOne({ _id:id, isActive: true });
//   }

  findById(id) {
  return Product.findById(id);
}


  updateById(id, data) {
    return Product.findOneAndUpdate(
      { _id:id },
      { $set: data },
      { new: true }
    );
  }

  deleteId(id) {
    return Product.findOneAndDelete({_id:id });
  }
}

module.exports = new ProductRepository();
