import React from "react";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo />
      <div>ProfileInfo сверху. MyPosts снизу</div>
      <MyPostsContainer store={props.store} />
    </div>
  );
};

export default Profile;
