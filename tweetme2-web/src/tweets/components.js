import React, { useState, useEffect } from "react";
import { TweetsList } from "./list";
import { TweetCreate } from "./create";
import { apiTweetDetail } from "./lookup";
import { Tweet } from "./detail";

export function TweetsComponent(props) {
  const [newTweets, setNewTweets] = useState([]);
  const canTweet = props.canTweet === "false" ? false : true;
  let tempNewTweets = [...newTweets];

  const handleNewTweet = (newTweet) => {
    tempNewTweets.unshift(newTweet);
    setNewTweets(tempNewTweets);
  };

  return (
    <div className={props.className}>
      {canTweet && <TweetCreate didTweet={handleNewTweet} />}
      <TweetsList newTweets={newTweets} {...props} />
    </div>
  );
}

export function TweetDetailComponent(props) {
  const { tweetId } = props;
  const [didLookUp, setDidLookUp] = useState(false);
  const [tweet, setTweet] = useState(null);
  const handleBackendLookup = (response, status) => {
    if (status === 200) {
      setTweet(response);
    } else {
      alert("There was an error finding the tweet.");
    }
  };

  useEffect(() => {
    if (didLookUp === false) {
      apiTweetDetail(tweetId, handleBackendLookup);
      setDidLookUp(true);
    }
  }, [didLookUp, tweetId]);

  return tweet === null ? null : (
    <Tweet tweet={tweet} className={props.className} />
  );
}
