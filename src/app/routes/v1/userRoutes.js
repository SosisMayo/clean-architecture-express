// src/app/routes/userRoutes.js
const express = require("express");
const userController = require("../../controllers/userController");
const authenticateJWT = require("../../../infrastructure/middlewares/authMiddleware");
const authorize = require("../../../infrastructure/middlewares/authorizationMiddleware");
const userValidation = require("../../../validators/userValidation");
const { validate } = require("../../../infrastructure/middlewares/validate");

const router = express.Router();

router
  .route("/")
  .post(
    validate(userValidation.createUserValidation),
    userController.createUser
  )
  .get(authenticateJWT, authorize(["readProfile"]), userController.getAllUsers);

module.exports = router;
