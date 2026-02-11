// in this file it will be used to define controllers

// require the services class to perform database actions
const userServices = require("../services/user.services");
// require the async handler to avoid from repetation of try/catch also it will resolve rejected promises

const asyncHandler = require("../utils/asyncHandler");

// constroller to get all the users from the database
class userController{
    getAllUsers= asyncHandler( async (req, res)=>{
        const usersData = await userServices.getAllUsers();
        res.json({ status:"success", data:usersData}) 
    })
    // get a user with user id
    getUserById = asyncHandler( async (req, res)=>{
        const specificUser = await userServices.getUserWithId(req.params.id);
        res.json({status:"success", data:specificUser})
    })
    // create a user
    createNewUser = asyncHandler( async (req, res)=>{
        const response = await userServices.createUser(req.body);
        res.json({staus:"success", data:response})
    })
    // delete a user
    deleteUser = asyncHandler( async (req, res)=>{
        const response = await userServices.deleteUser(req.params.id);
        res.json({status:"success", data:response})
    })
    updateUser = asyncHandler( async (req, res)=>{
        const response = await userServices.updateById(req.params.id, req.body);
        res.json({status:"success", data:response})
    })

}

module.exports  = new userController();