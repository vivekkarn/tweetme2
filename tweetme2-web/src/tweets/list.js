import React, { useState, useEffect } from "react";
import { apiTweetList } from "./lookup";
import { Tweet } from "./detail";

export function TweetsList(props) {
  const [tweetsInit, setTweetsInit] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [tweetDidSet, setTweetDidSet] = useState(false);

  useEffect(() => {
    const final = [...props.newTweets].concat(tweetsInit);
    if (final.length !== tweets.length) {
      setTweets(final);
    }
  }, [props.newTweets, tweetsInit, tweets]);

  useEffect(() => {
    if (tweetDidSet === false) {
      const handleTweetListLookup = (response, status) => {
        if (status === 200) {
          setTweetsInit(response);
          setTweetDidSet(true);
        } else {
          alert("an error occured.");
        }
      };
      apiTweetList(props.username, handleTweetListLookup);
    }
  }, [tweetsInit, tweetDidSet, setTweetDidSet, props.username]);

  const handleDidRetweet = (newTweet) => {
    const updateTweetsInIt = [...tweetsInit];
    updateTweetsInIt.unshift(newTweet);
    setTweetsInit(updateTweetsInIt);

    const updateFinalTweet = [...tweets];
    updateFinalTweet.unshift(newTweet);
    setTweets(updateFinalTweet);
  };

  return tweets.map((item, index) => (
    <Tweet
      tweet={item}
      didRetweet={handleDidRetweet}
      key={index}
      className="my-10 py-10 mx-auto border bg-white text-dark"
    />
  ));
}
