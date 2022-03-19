import { actions } from "./constans";
import { profileAPI, usersAPI } from "../api/api";
import { stopSubmit } from "redux-form";

let initialState = {
  posts: [
    {
      id: 1,
      message: "Готовиться всем: марафонский метод Хансонов",
      likesCount: 15,
    },
    {
      id: 2,
      message: "Crazy Owl 11-12 июня 2022",
      likesCount: 20,
    },
    {
      id: 3,
      message: "GRUT T80",
      likesCount: 24,
    },
    {
      id: 4,
      message: "Сочи Хока 85 км, 10 сентября",
      likesCount: 28,
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

    case actions.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };

    case actions.SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };

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
export const deletePost = (postId) => ({ type: actions.DELETE_POST, postId });
export const savePhotoSuccess = (photos) => ({
  type: actions.SAVE_PHOTO_SUCCESS,
  photos,
});

export const getUserProfile = (userId) => async (dispatch) => {
  let response = await usersAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
};

export const getStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch, getState) => {
  const currentState = getState();
  dispatch(setStatus(status));
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode !== 0) {
    dispatch(setStatus(currentState.profilePage.status));
  }
};

export const savePhoto = (file) => async (dispatch) => {
  let response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};

export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const response = await profileAPI.saveProfile(profile);
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  } else {
    dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
    return Promise.reject(response.data.messages[0]);
    // dispatch(
    //   stopSubmit("edit-profile", {
    //     contacts: { facebook: response.data.messages[0] },
    //   })
    // );
  }
};

export const likeCreator = (postId) => ({
  type: actions.TOGGLE_LIKE_POST,
  postId: postId,
});

export default profileReducer;
