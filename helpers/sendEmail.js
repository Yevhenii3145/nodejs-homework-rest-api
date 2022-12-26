const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "zgardan19@ukr.net" };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;

// const email = {
//   to: "hiyowop403@kingsready.com",
//   from: "bogdan.lyamzin.d@gmail.com",
//   subject: "Новая заявка с сайта",
//   html: "<p>С сайта пришда новая заявка</p>",
// };

// sgMail
//   .send(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));
