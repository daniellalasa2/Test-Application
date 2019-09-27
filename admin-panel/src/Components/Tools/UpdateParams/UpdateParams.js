/*******

This function gives a param object as first argument and param string as second argument
and update second argument params with first one then return a Url search string

********/
function UpdateAndReturnAUrlString(paramsObj, urlSearchParams) {
  let updatedParams = {};
  const urlParser = url => {
    const params = new URLSearchParams(url);
    const paramsObj = {};
    for (const [key, value] of params.entries()) {
      paramsObj[key] = value;
    }
    return paramsObj;
  };
  urlSearchParams = urlParser(urlSearchParams);
  updatedParams = { ...urlSearchParams, ...paramsObj };
  //convert obj to url parameters
  var str = "";
  for (var key in updatedParams) {
    if (str !== "") {
      str += "&";
    }
    str += key + "=" + encodeURIComponent(updatedParams[key]);
  }
  return "?" + str;
}

export default UpdateAndReturnAUrlString;
