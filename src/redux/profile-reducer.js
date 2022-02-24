import { actions } from "./constans";
import { profileAPI, usersAPI } from "../api/api";

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
  profile: null,
  status: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: "",
      };
    }

    case actions.SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
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

      return {
        ...state,
        posts: [...state.posts],
      };

    case actions.SET_USER_PROFILE:
      return { ...state, profile: action.profile };

    default:
      return state;
  }
};
export const addPostCreator = (newPostText) => ({
  type: actions.ADD_POST,
  newPostText,
});
export const setUserProfile = (profile) => ({
  type: actions.SET_USER_PROFILE,
  profile,
});
export const setStatus = (status) => ({ type: actions.SET_STATUS, status });

export const getUserProfile = (userId) => (dispatch) => {
  usersAPI.getProfile(userId).then((response) => {
    dispatch(setUserProfile(response.data));
  });
};

export const getStatus = (userId) => (dispatch) => {
  profileAPI.getStatus(userId).then((response) => {
    dispatch(setStatus(response.data));
  });
};

export const updateStatus = (status) => (dispatch, getState) => {
  const currentState = getState();
  dispatch(setStatus(status));
  profileAPI
    .updateStatus(status)
    .then((response) => {
      if (response.data.resultCode !== 0) {
        dispatch(setStatus(currentState.profilePage.status));
      }
    })
    .catch((err) => {
      dispatch(setStatus(currentState.profilePage.status));
      console.error("Ошибка при присвоении статуса:", err);
    });
};

export const likeCreator = (postId) => ({
  type: actions.TOGGLE_LIKE_POST,
  postId: postId,
});

export default profileReducer;
