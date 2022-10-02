const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersControllers");
// here we can set all routes
router
  .route("/")
  .get(userController.getUsers)
  .post(userController.addNewPayment);

router
  .route("/:id")
  .delete(userController.deletePayment)
  .get(userController.userDetail)
  .put(userController.updatePayment);

module.exports = router;
