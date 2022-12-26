const { NotFound, BadRequest } = require("http-errors");
const { sendEmail } = require("../../helpers");
const { User } = require("../../models");


const repitedVerifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw NotFound("missing required field email");
  }
  const user = await User.findOne({ email });
  if (user.verify) {
    throw BadRequest("Verification has already been passed");
  }
  sendEmail(email, user.verificationToken);
  //   await User.findOneAndUpdate(email, {
  //     verify: true,
  //     verificationToken: null,
  //   });
  res.json({
    email,
  });
};

module.exports = repitedVerifyEmail;
