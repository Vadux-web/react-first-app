import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";

window.props = [];

const MyPosts = React.memo((props) => {
  console.log("Render");
  window.props.push(props);
  console.log(props);

  const postsElements = [...props.posts].reverse().map((p) => {
    const handleLike = () => {
      props.handleLike(p.id);
    };

    return (
      <Post
        liked={p.liked}
        disliked={p.disliked}
        onLike={handleLike}
        message={p.message}
        likesCount={p.likesCount}
        key={p.id}
      />
    );
  });

  // let newPostElement = React.createRef();

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My post</h3>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
});

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="newPostText"
          component={Textarea}
          validate={[required, maxLength10]}
          placeholder={"Post message"}
        />
      </div>
      <div>
        <button disabled={!props.valid}>Add post</button>
      </div>
    </form>
  );
};

const AddNewPostFormRedux = reduxForm({ form: "ProfileAddNewPostForm" })(
  AddNewPostForm
);

export default MyPosts;
