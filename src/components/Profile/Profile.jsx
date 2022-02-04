import React from "react";
import ProfileInfoContainer from "./ProfileInfo/ProfileInfoContainer";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
  return (
    <div>
      <ProfileInfoContainer />
      <div>ProfileInfo сверху. MyPosts снизу</div>
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
