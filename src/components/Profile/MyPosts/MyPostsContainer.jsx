import React from "react";
import {
  addPostCreator,
  updateNewPostTextCreator,
  likeCreator,
} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";

const MyPostsContainer = () => {
  return (
    <StoreContext.Consumer>
      {(store) => {
        let state = store.getState();
        let addPost = () => {
          store.dispatch(addPostCreator());
        };
        let onPostChange = (text) => {
          store.dispatch(updateNewPostTextCreator(text));
        };
        let handleLike = (id) => {
          store.dispatch(likeCreator(id));
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
      }}
    </StoreContext.Consumer>
  );
};

export default MyPostsContainer;
