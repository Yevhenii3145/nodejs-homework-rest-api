const express = require("express");
const {
  validationConstructor,
  controllerWrapper,
  isValidId,
  isAuth,
  upload,
} = require("../../middlewares");
const { users } = require("../../controllers");

const router = express.Router();

router.get("/current", isAuth, controllerWrapper(users.getCurrent));
router.patch(
  "/avatars",
  isAuth,
  upload.single("avatar"),
  controllerWrapper(users.updateAvatar)
);
router.get("/verify/:verificationToken", controllerWrapper(users.verifyEmail));

module.exports = router;
