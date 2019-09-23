function UpdateParams(paramsObj, urlSearchParams) {
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
    if (str != "") {
      str += "&";
    }
    str += key + "=" + encodeURIComponent(updatedParams[key]);
  }
  return "?" + str;
}

export default UpdateParams;
