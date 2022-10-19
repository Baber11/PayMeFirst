import axios from "axios";
import { Alert } from "react-native";
import { baseUrl } from "../Config";

/**
 * @description Sends a Get request to api
 * @param {String} route
 * @example "/api/route"
 * @returns Promise<any>
 */

const URL = (link) => {
  return `${baseUrl}/api/v1/${link}`;
};

let Get = async (route, token, showAlert = true) => {
  const options = {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
  const apiUrl = URL(route);
  try {
    const response = await axios.get(apiUrl, options);
    return response;
  } catch (error) {
    console.log("error", error.response);
    let networkError = error.message === "Network Error";
    if (showAlert == true) {
      if (networkError === true) {
        Alert.alert(
          error.message,
          "Please Check Your Network Connection",
          [
            {
              text: "OK",
              onPress: () => {
                console.log("OK Pressed");
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          "Submission Errors",
          error.response.data.message,
          [
            {
              text: "OK",
              onPress: () => {
                console.log("OK Pressed");
              },
            },
          ],
          { cancelable: false }
        );
      }
    }
  }
};

/**
 * @description Sends a post request to api
 * @param {String} route
 * @example "/api/route"
 * @param {Object} data
 * @example {foo:bar}
 * @returns Promise<any>
 */

let Post = async (route, data, headers, showAlert = true) => {
  const apiUrl = URL(route);
  try {
    return await axios.post(apiUrl, data, headers);
  } catch (error) {
    console.log("error", error.response?.data);
    let networkError = error.message === "Network Error";
    if (showAlert == true) {
      if (networkError === true) {
        Alert.alert(
          error.message,
          "Please Check Your Network Connection",
          [
            {
              text: "OK",
              onPress: () => {
                console.log("OK Pressed");
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          "Submission Errors",
          error.response.data.message,
          [
            {
              text: "OK",
              onPress: () => {
                console.log("OK Pressed");
              },
            },
          ],
          { cancelable: false }
        );
      }
    }
    return undefined;
  }
};

/**
 * @description Sends a post request to api
 * @param {String} route
 * @example "/api/route"
 * @param {Object} data
 * @example {foo:bar}
 * @returns Promise<any>
 */
let Patch = async (route, data, headers, showAlert = true) => {
  const apiUrl = URL(route);
  try {
    return await axios.patch(apiUrl, data, headers);
  } catch (error) {
    console.log("error", error?.response?.data);
    let networkError = error.message === "Network Error";
    if (showAlert == true) {
      if (networkError === true) {
        Alert.alert(
          error.message,
          "Please Check Your Network Connection",
          [
            {
              text: "OK",
              onPress: () => {
                console.log("OK Pressed");
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          "Submission Errors",
          error.response.data.message,
          [
            {
              text: "OK",
              onPress: () => {
                console.log("OK Pressed");
              },
            },
          ],
          { cancelable: false }
        );
      }
    }
  }
};

let Delete = async (route, data, headers, showAlert = true) => {
  const apiUrl = URL(route);

  try {
    return data == null
      ? await axios.delete(apiUrl, headers)
      : await axios.delete(apiUrl, data, headers);
  } catch (error) {
    console.log("error", error?.response?.data);
    let networkError = error.message === "Network Error";
    if (showAlert == true) {
      if (networkError === true) {
        Alert.alert(
          error.message,
          "Please Check Your Network Connection",
          [
            {
              text: "OK",
              onPress: () => {
                console.log("OK Pressed");
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          "Submission Errors",
          error.response.data.message,
          [
            {
              text: "OK",
              onPress: () => {
                console.log("OK Pressed");
              },
            },
          ],
          { cancelable: false }
        );
      }
    }
  }
};

export { Post, Get, Patch, Delete };
