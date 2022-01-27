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
  switch (action.type) {
    case actions.ADD_POST: {
      let newPost = {
        id: 5,
        message: state.newPostText,
        likesCount: 0,
      };
      let stateCopy = { ...state };
      stateCopy.posts = [...state.posts];
      stateCopy.posts.push(newPost);
      stateCopy.newPostText = "";
      return stateCopy;
    }
    case actions.UPDATE_NEW_POST_TEXT: {
      let stateCopy = { ...state };
      stateCopy.newPostText = action.newText;
      return stateCopy;
    }
    case actions.TOGGLE_LIKE_POST:
      const postId = action.postId;
      const currentPost = state.posts.find((post) => {
        return postId === post.id;
      });
      if (currentPost) {
        currentPost.likesCount = currentPost.liked
          ? currentPost.likesCount - 1
          : currentPost.likesCount + 1;
        currentPost.liked = !currentPost.liked;
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
  type: actions.TOGGLE_LIKE_POST,
  postId: postId,
});

export default profileReducer;
