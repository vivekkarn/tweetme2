function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export function backendLookup(method, endpoint, callback, data) {
  let jsonData;
  if (data) {
    jsonData = JSON.stringify(data);
  }
  const xhr = new XMLHttpRequest(); // xhr = SomeClass()
  const url = `https://tweetme2.herokuapp.com/api/${endpoint}`;
  xhr.responseType = "json";
  var csrftoken = getCookie("csrftoken");
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/json");
  if (csrftoken) {
    // xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
  }
  xhr.onload = function () {
    if (xhr.status === 403) {
      const detail = xhr.response.detail;
      if (detail === "Authentication credentials were not provided.") {
        if (window.location.href.indexOf("login") === -1) {
          window.location.href = "/login?showLoginRequired=true";
        }
      }
    }
    callback(xhr.response, xhr.status);
  };

  xhr.onerror = function (event) {
    console.log("error is ", event);
    callback({ message: "there was an error" }, 400);
  };
  xhr.send(jsonData);
}
