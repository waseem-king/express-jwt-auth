// this repository layer will handle db manipulation only 
const User = require("../model/user.model");

class  UserRepository {
    async create(userData){
        return await User.create(userData);
    }
    async findAll(){
        return await User.find();
    }
    async findById(id){
        return await User.findById(id)
    }
    async findByEmail(email){
        return await User.findOne({email})
    }
    async deleteById(id){
        return await User.findByIdAndDelete(id)
    }
    async updateById(id, data){
        return await User.findByIdAndUpdate(id, data, { new:true, runValidators:true})
    }

}

module.exports = new UserRepository()