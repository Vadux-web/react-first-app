import React from "react";
import {
  addPostCreator,
  updateNewPostTextCreator,
  likeCreator,
} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = (props) => {
  let state = props.store.getState();

  let addPost = () => {
    props.store.dispatch(addPostCreator());
  };

  let onPostChange = (text) => {
    props.store.dispatch(updateNewPostTextCreator(text));
  };

  let handleLike = (id) => {
    props.store.dispatch(likeCreator(id));
  };

  return (
    <MyPosts
      updateNewPostText={onPostChange}
      addPost={addPost}
      handleLike={handleLike}
      posts={state.profilePage.posts}
      newPostText={state.profilePage.newPostText}
    />
  );
};

export default MyPostsContainer;
