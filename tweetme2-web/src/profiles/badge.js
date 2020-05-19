import React, { useState, useEffect } from "react";
import { apiProfileDetail, apiProfileFollowToggle } from "./lookup";
import { UserDisplay, UserPicture } from "./components";
import { DisplayCount } from "./utils";

function ProfileBadge(props) {
  const { user, didFollowToggle, profileLoading } = props;
  let currentVerb = user && user.is_following ? "Unfollow" : "Follow";
  currentVerb = profileLoading ? "Loading..." : currentVerb;

  const handleFollowToggle = (event) => {
    event.preventDefault();
    console.log(event);
    if (didFollowToggle && !profileLoading) {
      didFollowToggle(currentVerb);
    }
  };

  return user ? (
    <div>
      <UserPicture user={user} hideLink />
      <p>
        <UserDisplay user={user} includeFullName hideLink />{" "}
      </p>
      <p>
        <DisplayCount>{user.follower_count}</DisplayCount> follower.
      </p>
      <p>
        <DisplayCount>{user.following_count}</DisplayCount> following.
      </p>
      <p>{user.bio}</p>
      <p>{user.location}</p>
      <button className="btn btn-primary" onClick={handleFollowToggle}>
        {currentVerb}
      </button>
    </div>
  ) : null;
}

export function ProfileBadgeComponent(props) {
  const { username } = props;
  const [didLookUp, setDidLookUp] = useState(false);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const handleBackendLookup = (response, status) => {
    if (status === 200) {
      setProfile(response);
    }
  };

  useEffect(() => {
    if (didLookUp === false) {
      apiProfileDetail(username, handleBackendLookup);
      setDidLookUp(true);
    }
  }, [username, setDidLookUp, didLookUp]);

  const handleNewFollow = (actionVerb) => {
    console.log(actionVerb);
    apiProfileFollowToggle(username, actionVerb, (response, status) => {
      console.log(response, status);
      if (status === 200) {
        setProfile(response);
      }
      setProfileLoading(false);
    });
    setProfileLoading(true);
  };
  return didLookUp === false ? (
    "Loading..."
  ) : profile ? (
    <ProfileBadge
      user={profile}
      didFollowToggle={handleNewFollow}
      profileLoading={profileLoading}
    />
  ) : null;
}
