import React from "react";
import s from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={s.item}>
      <img src="https://sun9-63.userapi.com/c850336/v850336386/15c377/0rgFfLUly7g.jpg" />
      {props.message}
      <div>
        <button disabled={props.liked} onClick={props.onLike}>
          <span>Like</span>
        </button>{" "}
        {props.likesCount}{" "}
        <button disabled={props.disliked} onClick={props.onDislike}>
          <span>Dislike</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
