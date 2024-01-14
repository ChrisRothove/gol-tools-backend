const express = require("express");
const router = express.Router();
const controller = require("./users.controller");
const methodNotAllowed = require("../../errors/methodNotAllowed");

router.route("/login").post(controller.login).all(methodNotAllowed);
router.route("/register").post(controller.register).all(methodNotAllowed);
router
  .route("/:userId")
  .get(controller.read)
  .put(controller.put)
  .all(methodNotAllowed);
router
  .route("/")
  .get(controller.list)
  .post(controller.post)
  .all(methodNotAllowed);

module.exports = router;
