const axios = require("axios");
import CustomError from "../util/error";

//auto generate code
const generateCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const sendSMS = async () => {
  const smsApiKey = process.env.NTFY_API_KEY;
  const phoneNumbers = JSON.parse(process.env.phoneNumbers || "[]");
  const code = generateCode();
  const apiKey = process.env.NTFY_API_KEY;

  const url = `https://api.mnotify.com/api/sms/quick?key=${apiKey}`;
  try {
    console.log(phoneNumbers);
    const response = await axios.post(
      url,
      {
        recipient: phoneNumbers,
        sender: "OrangePlate",
        message: `Your delivery code is ${code}`,
        is_schedule: "false",
        schedule_date: "",
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
  } catch (err: any) {
    console.log(err.response.data);
    throw new CustomError("Something went wrong: SMS was not sent", 500);
  }
};
// sendSMS();
