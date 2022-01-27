import React from "react";
import s from "./Post.module.css";

const Post = (props) => {
  const buttonText = props.liked ? "Dislike" : "Like";

  return (
    <div className={s.item}>
      <img
        alt="avatar"
        src="https://sun9-63.userapi.com/c850336/v850336386/15c377/0rgFfLUly7g.jpg"
      />
      {props.message}
      <div>
        <button onClick={props.onLike}>
          <span>{buttonText}</span>
        </button>{" "}
        {props.likesCount}
      </div>
    </div>
  );
};

export default Post;
