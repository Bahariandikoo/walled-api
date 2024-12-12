const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.controller");
const userRepository = require("../repositories/users.repository");

router.get("/users", userRepository.getUser);
router.post("/users", userController.createUser);
router.post("/login", userController.login);

module.exports = router;
