import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { actions } from "../../../redux/constans";

const MyPosts = (props) => {
  const postsElements = props.posts.map((p) => {
    return <Post message={p.message} likesCount={p.likesCount} />;
  });

  let newPostElement = React.createRef();

  let addPost = () => {
    props.dispatch({ type: actions.addPost });
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.dispatch({ type: actions.updateNewPostText, newText: text });
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
