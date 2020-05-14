import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function loadTweets(callback) {
  const xhr = new XMLHttpRequest(); // xhr = SomeClass()
  const method = "GET";
  const url = "http://127.0.0.1:8000/api/tweets";
  const responseType = "json";

  xhr.responseType = responseType;
  xhr.open(method, url);
  xhr.onload = function () {
    callback(xhr.response, xhr.status);
  };

  xhr.onerror = function (a) {
    //a is something called progressed event.
    console.log("error is ", a);
    callback({ message: "there was an error" }, 400);
  };
  xhr.send();
}

function Tweet(props) {
  const { tweet } = props;
  const className = props.className ? props.className : "col-10";
  const action = { type: "like" };
  return (
    <div className={className}>
      <div>
        {tweet.id} -- {tweet.content}
      </div>
      <div className="btn btn-group">
        <ActionBtn tweet={tweet} action={action} />
      </div>
    </div>
  );
}

function ActionBtn(props) {
  const { tweet, action } = props;
  const className = props.className
    ? props.className
    : "btn btn-primary btn-sm";
  return action.type === "like" ? (
    <button className={className}> {tweet.likes} Like </button>
  ) : null;
}

function App() {
  const [tweets, setTweets] = useState([{ content: 123 }]);

  useEffect(() => {
    const callback = (response, status) => {
      if (status === 200) {
        setTweets(response);
      }
    };
    loadTweets(callback);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          {tweets.map((item, index) => {
            return (
              <div>
                <Tweet
                  tweet={item}
                  key={index}
                  className="my-5 py-5 border bg-white text-dark"
                />
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
