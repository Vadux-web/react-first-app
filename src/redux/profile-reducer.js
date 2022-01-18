import { actions } from "./constans";

let initialState = {
  posts: [
    {
      id: 1,
      message:
        "Афера космического ботаника: Как Илон Маск украл у России многоразовую ракету",
      likesCount: 15,
    },
    {
      id: 2,
      message: "Готовиться всем: тревожная новость от Мишустина",
      likesCount: 20,
    },
  ],
  newPostText: "New Post Text",
};

const profileReducer = (state = initialState, action) => {
  const postId = action.postId;
  const currentPost = state.posts.find((post) => {
    return postId === post.id;
  });

  switch (action.type) {
    case actions.ADD_POST:
      let newPost = {
        id: 5,
        message: state.newPostText,
        likesCount: 0,
      };
      state.posts.push(newPost);
      state.newPostText = "";
      return state;
    case actions.UPDATE_NEW_POST_TEXT:
      state.newPostText = action.newText;
      return state;

    case actions.LIKE_POST:
      if (currentPost) {
        currentPost.likesCount = currentPost.likesCount + 1;
        currentPost.liked = true;
        currentPost.disliked = false;
      }
      return state;
    case actions.DISLIKE_POST:
      if (currentPost) {
        currentPost.likesCount = currentPost.likesCount - 1;
        currentPost.disliked = true;
        currentPost.liked = false;
      }
      return state;

    default:
      return state;
  }
};

export const addPostCreator = () => ({ type: actions.ADD_POST });
export const updateNewPostTextCreator = (text) => ({
  type: actions.UPDATE_NEW_POST_TEXT,
  newText: text,
});
export const likeCreator = (postId) => ({
  type: actions.LIKE_POST,
  postId: postId,
});
export const dislikeCreator = (postId) => ({
  type: actions.DISLIKE_POST,
  postId: postId,
});

export default profileReducer;
