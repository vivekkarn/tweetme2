import React, { useState } from "react";
import { ActionBtn } from "./buttons";

export function ParentTweet(props) {
  const { tweet } = props;
  return tweet.og_tweet ? (
    <div className="row">
      <div className="col-11 mx-auto p-3 border rounded">
        <p className="mb-0 text-muted small">Retweet</p>
        <Tweet hideActions tweet={tweet.og_tweet} />
      </div>
    </div>
  ) : null;
}

export function Tweet(props) {
  const { tweet, didRetweet, hideActions } = props;
  const [actionTweet, setActionTweet] = useState(
    props.tweet ? props.tweet : null
  );
  const className = props.className ? props.className : "col-10";
  const action = { type: "like", display: "Likes" };

  const path = window.location.pathname;
  const idRegex = /(?<tweetid>\d+)/;
  const match = path.match(idRegex);
  const urlTweetId = match ? match.groups.tweetid : -1;

  const isDetail = `${urlTweetId}` === `${tweet.id}`;

  const handleLink = (event) => {
    event.preventDefault();
    window.location.href = `/${tweet.id}`;
  };

  const handlePerformAction = (newActionTweet, status) => {
    if (status === 200) {
      setActionTweet(newActionTweet);
    } else if (status === 201) {
      //do something
      if (didRetweet) {
        didRetweet(newActionTweet);
      }
    }
  };
  return (
    <div className={className}>
      <div>
        <p>
          {tweet.id} - {tweet.content}
        </p>
        <div>
          <ParentTweet tweet={tweet} />
        </div>
      </div>
      <div className="btn btn-group">
        <div>
          {actionTweet && hideActions !== true && (
            <React.Fragment>
              <ActionBtn
                tweet={actionTweet}
                didperformAction={handlePerformAction}
                action={action}
              />
              <ActionBtn
                tweet={actionTweet}
                didperformAction={handlePerformAction}
                action={{ type: "unlike", display: "Unlike" }}
              />
              <ActionBtn
                tweet={actionTweet}
                didperformAction={handlePerformAction}
                action={{ type: "retweet", display: "Retweets" }}
              />
            </React.Fragment>
          )}

          {isDetail === true ? null : (
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={handleLink}
            >
              View
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
