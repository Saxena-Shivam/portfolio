const express = require("express");
const cors = require("cors");
const sendMailRoute = require("./sendMail");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/send-mail", sendMailRoute);

app.listen(5000, () => console.log("Server running on port 5000"));
