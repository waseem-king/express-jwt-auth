// get the repository for database calls
const userRepository = require("../repositories/user.repositories");
const AppError = require("../middleware/appError");

// this is the service module which will defince the business logic to connect with database
class userServices{
    async createUser(data){
        const existingUser = await userRepository.findByEmail(data.email)
        if(existingUser){
            throw new AppError("User already exist", 400)
        }
        return userRepository.create(data)
    }
    // get all the users
    async getAllUsers(){
        return await userRepository.findAll()
    }
    async getUserWithId(id){
        const user =  await userRepository.findById(id);
        if(!user){
            throw new AppError("User not found", 404)
        }
        return user;
    }
    async deleteUser(id){
        const response = await userRepository.deleteById(id);
        if(!response){
            throw new AppError("User not found", 404)
        }
        return response;
    }
    async updateById(id, data){
        const response = await userRepository.updateById(id, data)
          if(!response){
            throw new AppError("User not found", 404)
        }
        return response;
    }
    async uploadVideo(data){
        const response = await userRepository.uploadVideo(data)
        if(!response){
            throw new AppError("video not stored", 400)
        }
        return response
    }
}

module.exports = new userServices()