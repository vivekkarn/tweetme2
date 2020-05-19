import React, { useState } from "react";
import { ActionBtn } from "./buttons";
import { UserDisplay, UserPicture } from "../profiles";

export function ParentTweet(props) {
  const { tweet } = props;
  return tweet.og_tweet ? (
    <Tweet isRetweet hideActions tweet={tweet.og_tweet} />
  ) : null;
}

export function Tweet(props) {
  const { tweet, didRetweet, hideActions, isRetweet } = props;
  const [actionTweet, setActionTweet] = useState(
    props.tweet ? props.tweet : null
  );
  let className = props.className ? props.className : "col-10 mx-auto col-md-6";
  className =
    isRetweet === true ? `${className} p-2 border rounded` : className;
  const action = { type: "like", display: "Upvote" };

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
      {isRetweet === true && (
        <div className="mb-2">
          <span className="small text-muted">
            Retweeted via <UserDisplay user={tweet.user} />
          </span>
        </div>
      )}
      <div className="d-flex">
        <UserPicture user={tweet.user} />
        <div className="col-11">
          <div>
            <UserDisplay includeFullName user={tweet.user} />
            <p>{tweet.content}</p>
            <div>
              <ParentTweet tweet={tweet} />
            </div>
          </div>
          <div className="btn btn-group px-0">
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
                    action={{ type: "unlike", display: "Downvote" }}
                  />
                  <ActionBtn
                    tweet={actionTweet}
                    didperformAction={handlePerformAction}
                    action={{ type: "retweet", display: "Repost" }}
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
      </div>
    </div>
  );
}
