const express = require("express");
const {
  controllerWrapper,
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
router.post("/verify/", controllerWrapper(users.repitedVerifyEmail));

module.exports = router;
