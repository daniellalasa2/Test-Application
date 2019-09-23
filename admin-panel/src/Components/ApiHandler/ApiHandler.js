import Config from "./Config";
import axios from "axios";
var _api = {
  header: {
    "content-type": "application/json"
  }
};
var errorHandler = statusCode => {
  const result = { message: "", code: statusCode, success: false };
  switch (statusCode) {
    case 200:
      result.message = "Created successfuly";
      result.success = true;
      break;
    case 201:
      result.message = "Created successfuly";
      result.success = true;
      break;
    case 204:
      result.message = "Successful without content";
      result.success = true;
      break;
    case 404:
      result.message = "Nothing Found";
      break;
    case 500:
      result.message = "Internal server error";
      break;
    case 400:
      result.message = "Bad request";
      break;
    case 401:
      result.message = "Unathorized";
      break;
    default:
      result.message = "An Unknown problem occured";
      break;
  }
  return result;
};

var GetSearchResult = (params, callback) => {
  axios({
    url: Config.BASE_URL,
    method: "GET",
    headers: {
      ..._api.header
    },
    params: {
      ...params
    }
  })
    .then(res => {
      const result = errorHandler(SafeValue(res, "status", "number", null));
      callback({
        success_result: result,
        data: SafeValue(res, "data", "object", [])
      });
    })
    .catch(err => {
      const result = errorHandler(
        SafeValue(err.response, "status", "number", 0)
      );
      callback({
        success_result: result,
        data: []
      });
    });
};

//This function handles data which coming from server to be accurate and reliable for UI rendering
var SafeValue = (
  data, //data which you want to examine
  index, //which index of data you look for inside "data" argument . exp: "item.name.en"
  type, //what is the type of export data if type not matching with incoming data then returns as default value
  defaultValue //default value which i've mentioned above
) => {
  try {
    if (!Boolean(data)) {
      return defaultValue;
    }
    index = index.toString().replace(" ", "");
    index = parseInt(index) == index ? parseInt(index) : index;
    //if index was empty string then just check validation of data
    if (index === "") {
      if (data !== null && data !== undefined && typeof data === type) {
        return data;
      } else {
        return defaultValue;
      }
    }
    let indexArr = typeof index === "string" ? index.split(".") : index;
    const cnt = indexArr.length;
    let val = "";
    for (let i = 0; i <= cnt - 1; i++) {
      val = indexArr[i];
      if (!Boolean(data)) {
        return defaultValue;
      }
      data = data[val];
      if (i === cnt - 1) {
        if (data !== null && data !== undefined) {
          //special type checkings mention here
          switch (type) {
            case typeof data:
              return data;
            case "json":
              type = typeof JSON.parse(data);
              if (type === "object") return data;
              else return defaultValue;
            default:
              return defaultValue;
          }
        } else {
          return defaultValue;
        }
      }
    }
  } catch (err) {
    console.warn("Value is not safe: ", err);
    return defaultValue;
  }
};

export { GetSearchResult, Config, SafeValue };
