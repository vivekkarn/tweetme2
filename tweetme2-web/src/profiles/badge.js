import React, { useState, useEffect } from "react";
import { apiProfileDetail } from "./lookup";

function ProfileBadge(props) {
  const { user } = props;
  console.log(user);

  return user ? <span>{user.username}</span> : null;
}

export function ProfileBadgeComponent(props) {
  const { username } = props;
  const [didLookUp, setDidLookUp] = useState(false);
  const [profile, setProfile] = useState(null);

  const handleBackendLookup = (response, status) => {
    if (status === 200) {
      setProfile(response);
      console.log(response);
    }
  };

  useEffect(() => {
    if (didLookUp === false) {
      apiProfileDetail(username, handleBackendLookup);
      setDidLookUp(true);
    }
  }, [username, setDidLookUp, didLookUp]);
  return didLookUp === false ? (
    "Loading..."
  ) : profile ? (
    <ProfileBadge user={profile} />
  ) : null;
}
