import axios from "axios";
import md5 from "md5";

async function callAPI(action: string, params = {}) {
  const PASSWORD = "Valantis";
  const URL = `http://api.valantis.store:40000/`;
  const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
  const authString = md5(`${PASSWORD}_${timestamp}`);

  const headers = {
    method: "POST",
    "Content-Type": "application/json",
    "X-Auth": authString,
  };

  const options = {
    headers,
  };

  try {
    const response = await axios.post(URL, { action, params }, options);
    return response.data.result;
  } catch (error) {
     if (error instanceof Error) {
       console.error("Error calling API 1:", error.message);
     } else {
       console.error("Error calling API 2:", error);
     }
    return await callAPI(action, params);
  }
}

export { callAPI };
