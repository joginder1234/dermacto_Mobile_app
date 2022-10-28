const axios = require("axios").default;

export let baseUrl = "http://078e-49-42-72-202.ngrok.io/api/v1";
// export let baseUrl = "";

export async function httpRequest(method, url, data, authtoken) {
  try {
    let response = await axios({
      headers: { token: authtoken },
      method: method,
      url: `${url}`,
      data: data,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function sendMultipart(url, data, authToken) {
  try {
    await axios.post(url, data, {
      headers: { token: authToken, "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    alert("Something went wrong!");
  }
}
