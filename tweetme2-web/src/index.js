import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";
import { TweetsComponent, TweetDetailComponent } from "./tweets";
import * as serviceWorker from "./serviceWorker";

//ReactDOM.render(<App />, document.getElementById("root"));

const e = React.createElement;
const tweetElement = document.getElementById("tweetme-2");
if (tweetElement) {
  const myComponent = e(TweetsComponent, tweetElement.dataset);
  ReactDOM.render(myComponent, tweetElement);
}

const tweetDetailElement = document.querySelectorAll(".tweetme2-detail");
tweetDetailElement.forEach((container) => {
  ReactDOM.render(e(TweetDetailComponent, container.dataset), container);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
