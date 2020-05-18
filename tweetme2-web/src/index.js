import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";
import { TweetsComponent, TweetDetailComponent, FeedComponent } from "./tweets";
import { ProfileBadgeComponent } from "./profiles";
import * as serviceWorker from "./serviceWorker";

//ReactDOM.render(<App />, document.getElementById("root"));

const e = React.createElement;
const tweetElement = document.getElementById("tweetme-2");
if (tweetElement) {
  const myComponent = e(TweetsComponent, tweetElement.dataset);
  ReactDOM.render(myComponent, tweetElement);
}

const tweetFeedEl = document.getElementById("tweetme-2-feed");
if (tweetFeedEl) {
  ReactDOM.render(e(FeedComponent, tweetFeedEl.dataset), tweetFeedEl);
}

const userProfileBadgeElement = document.querySelectorAll(
  ".tweetme2-profile-badge"
);
userProfileBadgeElement.forEach((container) => {
  ReactDOM.render(e(ProfileBadgeComponent, container.dataset), container);
});

const tweetDetailElement = document.querySelectorAll(".tweetme2-detail");
tweetDetailElement.forEach((container) => {
  ReactDOM.render(e(TweetDetailComponent, container.dataset), container);
});
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
