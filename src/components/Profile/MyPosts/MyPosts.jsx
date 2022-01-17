import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {
  addPostCreator,
  dislikeCreator,
  likeCreator,
  updateNewPostTextCreator,
} from "../../../redux/profile-reducer";

const MyPosts = (props) => {
  const postsElements = props.posts.map((p) => {
    const handleLike = () => {
      props.dispatch(likeCreator(p.id));
    };
    const handleDislike = () => {
      props.dispatch(dislikeCreator(p.id));
    };
    return (
      <Post
        liked={p.liked}
        disliked={p.disliked}
        onLike={handleLike}
        onDislike={handleDislike}
        message={p.message}
        likesCount={p.likesCount}
      />
    );
  });

  let newPostElement = React.createRef();

  let addPost = () => {
    props.dispatch(addPostCreator());
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.dispatch(updateNewPostTextCreator(text));
  };

  return (
    <div className={s.postsBlock}>
      <h3>My post</h3>
      <div>
        <div>
          <textarea
            onChange={onPostChange}
            ref={newPostElement}
            value={props.newPostText}
            placeholder={"...post"}
          />
        </div>
        <div>
          <button onClick={addPost}>Add post</button>
        </div>
      </div>
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
