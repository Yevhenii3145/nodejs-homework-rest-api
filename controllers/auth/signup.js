const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { User } = require("../../models");

const request = {
  body: {
    email: "ff@com",
    password: "123456",
    subscription: "pro",
  },
};

const signup = async (req, res) => {
  const { email, password, subscription } = req.body || request.body;

  const dublicateUser = await User.findOne({ email });
  if (dublicateUser) {
    throw new Conflict("Email  in use");
  }
  const avatarURL = gravatar.url(email);
  const newUser = new User({ subscription, email, avatarURL });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    ResponseBody: {
      email,
      subscription,
      avatarURL,
    },
  });
};

module.exports = signup;
