import React from "react";
import { apiTweetCreate } from "./lookup";

export function TweetCreate(props) {
  const textAreaRef = React.createRef();
  const { didTweet } = props;

  const handleBackendUpdate = (response, status) => {
    if (status === 201) {
      didTweet(response);
    } else {
      console.log("An error occured ", response);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newValue = textAreaRef.current.value;
    apiTweetCreate(newValue, handleBackendUpdate);
    textAreaRef.current.value = "";
  };

  return (
    <div className="col-12 mb-3">
      <form>
        <textarea
          ref={textAreaRef}
          required={true}
          className="form-control"
          name="tweet"
        ></textarea>
        <button
          type="submit"
          className="btn btn-primary my-3"
          onClick={handleSubmit}
        >
          Tweet
        </button>
      </form>
    </div>
  );
}
