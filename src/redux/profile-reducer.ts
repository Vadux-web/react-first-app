import { profileAPI, usersAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux-store";

const ADD_POST = "ADD-POST";
const SET_STATUS = "SET-STATUS";
const TOGGLE_LIKE_POST = "TOGGLE-LIKE-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const DELETE_POST = "DELETE-POST";
const SAVE_PHOTO_SUCCESS = "SAVE-PHOTO-SUCCESS";

type InitialStateType = {
  posts: Array<PostType>;
  profile: ProfileType | null;
  status: string;
  newPostText: string;
};

let initialState: InitialStateType = {
  posts: [
    {
      id: 1,
      message: "Готовиться всем: марафонский метод Хансонов",
      likesCount: 15,
      liked: null,
    },
    {
      id: 2,
      message: "Crazy Owl 11-12 июня 2022",
      likesCount: 20,
      liked: true,
    },
    {
      id: 3,
      message: "GRUT T80",
      likesCount: 24,
      liked: null,
    },
    {
      id: 4,
      message: "Сочи Хока 85 км, 10 сентября",
      likesCount: 28,
      liked: null,
    },
  ] as Array<PostType>,
  profile: null,
  status: "",
  newPostText: "",
};

const profileReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
        liked: null,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: "",
      };
    }

    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }

    case TOGGLE_LIKE_POST:
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

    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };

    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };

    default:
      return state;
  }
};

type ActionsTypes =
  | AddPostCreatorType
  | SetUserProfileActionType
  | SetStatusActionType
  | DeletePostActionType
  | SavePhotoSuccessActionType
  | LikeCreatorActionType;

type AddPostCreatorType = {
  type: typeof ADD_POST;
  newPostText: string;
};
export const addPostCreator = (newPostText: string): AddPostCreatorType => ({
  type: ADD_POST,
  newPostText,
});

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};
export const setUserProfile = (
  profile: ProfileType
): SetUserProfileActionType => ({
  type: SET_USER_PROFILE,
  profile,
});

type SetStatusActionType = {
  type: typeof SET_STATUS;
  status: string;
};
export const setStatus = (status: string): SetStatusActionType => ({
  type: SET_STATUS,
  status,
});

type DeletePostActionType = {
  type: typeof DELETE_POST;
  postId: number;
};
export const deletePost = (postId: number): DeletePostActionType => ({
  type: DELETE_POST,
  postId,
});

type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: PhotosType;
};
export const savePhotoSuccess = (photos): SavePhotoSuccessActionType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

type LikeCreatorActionType = {
  type: typeof TOGGLE_LIKE_POST;
  postId: number;
};
export const likeCreator = (postId) => ({
  type: TOGGLE_LIKE_POST,
  postId: postId,
});

type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export const getUserProfile = (userId: number): ThunkType => async (
  dispatch
) => {
  let response = await usersAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
};
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};
export const updateStatus = (status: string): ThunkType => async (
  dispatch,
  getState: GetStateType
) => {
  const currentState = getState();
  dispatch(setStatus(status));
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode !== 0) {
    dispatch(setStatus(currentState.profilePage.status));
  }
};

export const savePhoto = (file: any): ThunkType => async (dispatch) => {
  let response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};

export const saveProfile = (profile: ProfileType): ThunkType => async (
  dispatch: any,
  getState: GetStateType
) => {
  const userId = getState().auth.userId;
  const response = await profileAPI.saveProfile(profile);
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  } else {
    dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
    return Promise.reject(response.data.messages[0]);
  }
};

export default profileReducer;
