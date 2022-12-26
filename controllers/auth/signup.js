const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
// const { nanoid } = require("nanoid");
const { sendEmail } = require("../../helpers");
const { User } = require("../../models");

const request = {
  body: {
    email: "ff@gmail.com",
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
  const verificationToken = Date.now();
  const avatarURL = gravatar.url(email);
  const newUser = new User({
    subscription,
    email,
    avatarURL,
    verificationToken,
  });

  newUser.setPassword(password);

  await newUser.save();

  const mail = {
    to: email,
    subject: "Подтверждение email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    ResponseBody: {
      email,
      subscription,
      avatarURL,
      verificationToken,
    },
  });
};

module.exports = signup;
