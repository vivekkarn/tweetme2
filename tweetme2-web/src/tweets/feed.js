import React, { useState, useEffect } from "react";
import { Tweet } from "./detail";
import { apiTweetFeed } from "./lookup";

export function FeedList(props) {
  const [tweetsInit, setTweetsInit] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [nextURL, setNextURL] = useState(null);
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
          setNextURL(response.next);
          setTweetsInit(response.results);
          setTweetDidSet(true);
        }
      };
      apiTweetFeed(handleTweetListLookup);
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

  const handleLoadNext = (event) => {
    event.preventDefault();
    if (nextURL !== null) {
      const handleLoadNextResponse = (response, status) => {
        if (status === 200) {
          setNextURL(response.next);
          const newResults = [...tweets].concat(response.results);
          setTweetsInit(newResults);
          setTweets(newResults);
        } else {
          console.log("An error.");
        }
      };
      apiTweetFeed(handleLoadNextResponse, nextURL);
    }
  };
  return (
    <React.Fragment>
      {tweets.map((item, index) => (
        <Tweet
          tweet={item}
          didRetweet={handleDidRetweet}
          key={index}
          className="my-10 py-10 mx-auto border bg-white text-dark"
        />
      ))}
      {nextURL !== null && (
        <button className="btn btn-primary" onClick={handleLoadNext}>
          Load next
        </button>
      )}
    </React.Fragment>
  );
}
