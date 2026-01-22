const bcrypt = require("bcryptjs");

const userRepo = require("./user.repository");
const ApiError = require("../utils/ApiError");

class UserService {
  // async createUser(data, adminId) {
  //   const { name, email, password,location,mobile,address,branch} = data;

  //   const existingUser = await userRepo.findByEmail(email);
  //   if (existingUser) {
  //     throw new ApiError("User already exists", 400);
  //   }

  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   const user = await userRepo.create({
  //     name,
  //     email,
  //     password: hashedPassword,
  //     location,
  //     mobile,
  //     branch,
  //     role: "user",
  //     createdBy: adminId,
  //     isActive: true,
  //   });

  //   return {
  //     id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     role: user.role,
  //   };
  // }

  async createUser(data, adminId) {
    const { 
      name, 
      email, 
      password,
      location,
      mobile,
      branch,
      role,
      status,
      addressData // Individual address fields
    } = data;
    
    console.log("Creating user with data:", data);
    
    const existingUser = await userRepo.findByEmail(email);
    if (existingUser) {
      throw new ApiError("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare addresses array from addressData
    let addressesArray = [];
    
    if (addressData && addressData.line1) {
      // Validate required fields for address
      if (!addressData.pincode) {
        addressData.pincode = "000000"; // Default pincode if not provided
      }
      
      addressesArray = [{
        fullName: addressData.fullName || name,
        phone: addressData.phone || mobile || "",
        line1: addressData.line1,
        city: addressData.city || location || "",
        pincode: addressData.pincode,
        isDefault: true // First address is always default
      }];
    }

    const user = await userRepo.create({
      name,
      email,
      password: hashedPassword,
      location,
      mobile,
      branch,
      role: (role || "user").toLowerCase(),
      createdBy: adminId,
      isActive: status === "Active" ? true : true,
      addresses: addressesArray
    });

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      location: user.location,
      mobile: user.mobile,
      branch: user.branch,
      isActive: user.isActive,
      addresses: user.addresses
    };
  }

async updateUsers(id, data) {
    const user = await userRepo.findOne(id);

    if (!user) throw new ApiError("User not found", 404);

    // Hash password if provided
    if (data.password && data.password.trim() !== "") {
      data.password = await bcrypt.hash(data.password, 10);
    } else {
      delete data.password;
    }

    // Convert status to isActive
    if (data.status) {
      data.isActive = data.status === "Active";
      delete data.status;
    }

    // Convert role to lowercase if provided
    if (data.role) {
      data.role = data.role.toLowerCase();
    }

    // Handle addressData if provided (from frontend)
    if (data.addressData) {
      const addressData = data.addressData;
      
      // Get existing addresses
      let addresses = user.addresses || [];
      
      if (addresses.length === 0) {
        // No existing address - create new one
        if (addressData.line1 && addressData.line1.trim() !== "") {
          const newAddress = {
            fullName: addressData.fullName || user.name,
            phone: addressData.phone || user.mobile || "",
            line1: addressData.line1,
            city: addressData.city || user.location || "",
            pincode: addressData.pincode || "000000",
            isDefault: true
          };
          data.addresses = [newAddress];
        }
      } else {
        // Update the default address (or first one if no default)
        let defaultAddressIndex = addresses.findIndex(addr => addr.isDefault);
        if (defaultAddressIndex === -1) defaultAddressIndex = 0;
        
        // Update the address fields
        addresses[defaultAddressIndex] = {
          ...addresses[defaultAddressIndex].toObject(),
          fullName: addressData.fullName || addresses[defaultAddressIndex].fullName || user.name,
          phone: addressData.phone || addresses[defaultAddressIndex].phone || user.mobile,
          line1: addressData.line1 || addresses[defaultAddressIndex].line1,
          city: addressData.city || addresses[defaultAddressIndex].city || user.location,
          pincode: addressData.pincode || addresses[defaultAddressIndex].pincode || "000000",
          isDefault: true
        };
        
        data.addresses = addresses;
      }
      
      delete data.addressData; // Remove addressData from update
    }

    const updatedUser = await userRepo.updateById(id, data);

    return {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      branch: updatedUser.branch,
      location: updatedUser.location,
      mobile: updatedUser.mobile,
      isActive: updatedUser.isActive,
      addresses: updatedUser.addresses
    };
  }



  async listUsers() {
    return userRepo.findAllUsers();
  }

  // async updateUsers(id,data){
    
  //   const user = await userRepo.findOne(id)

  //   console.log("user",user);
    

  //   if(!user) throw new ApiError ("user not found",404)

  //   if (data.password) {
  //   data.password = await bcrypt.hash(data.password, 10);
  // } else {
  //   delete data.password;
  // }

  //   const newData = await userRepo.updateById(id,data)

  //   console.log("new",newData);

  //   return {
  //       _id:newData.id,
  //       name:newData.name,
  //       email:newData.email, 
  //       role: newData.role,   
  //       branch:newData.branch,
  //       location:newData.location,
  //       address:newData.address
  //    }
  //   }

    async deleteUser(id) {
    const user = await userRepo.findOne(id)

    console.log("user",user);
    
    if(!user) throw new ApiError ("user not found",404)

    const deleteUser = await userRepo.deleteById(id)

    console.log("dlt data",deleteUser);

    return {
        data:deleteUser
    }
    
    }


  async toggleUserStatus(userId) {
    const user = await userRepo.findOne(userId);
    if (!user) throw new ApiError("User not found", 404);

    return userRepo.updateStatus(userId, !user.isActive);
  }


  async getMyProfile (id) {
    const user = await userRepo.findOne(id)
    console.log("user profile",user);
    

  if (!user) {
    if (!user) throw new ApiError("User not found", 404);
  }

 return user
  }
}

module.exports = new UserService();
