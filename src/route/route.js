const express = require('express');
const router = express.Router();

const userController= require("../controllers/userController")


router.post("/createuser", userController.createuser) // user creation
router.get("/user",userController.getusers) //get all th user when the condition is satisfied which is passed in query params 
router.put("/users/:userId",userController.updateuser) // updating a user when userId is present in path params
router.delete("/users/:userId",userController.deleteId)  //deleting a user when userId is present in path params 





module.exports = router;