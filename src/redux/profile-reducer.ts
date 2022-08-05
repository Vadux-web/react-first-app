import {actions} from "./constans";
import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";


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
            message: "Сочи теперь не Хока 85 км, 10 сентября",
            likesCount: 28,
        },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: '',
};

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
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
            return {...state, profile: action.profile};

        case actions.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((p) => p.id !== action.postId),
            };

        case actions.SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType,
            };

        default:
            return state;
    }
};

type AddPostCreatorActionType = {
    type: typeof actions.ADD_POST
    newPostText: string
}
export const addPostCreator = (newPostText: string): AddPostCreatorActionType => ({
    type: actions.ADD_POST,
    newPostText,
});

type SetUserProfileActionType = {
    type: typeof actions.SET_USER_PROFILE,
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({
    type: actions.SET_USER_PROFILE,
    profile,
});

type SetStatusActionType = {
    type: typeof actions.SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({type: actions.SET_STATUS, status});

type DeletePostActionType = {
    type: typeof actions.DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({type: actions.DELETE_POST, postId});

type SavePhotoSuccessActionType = {
    type: typeof actions.SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({
    type: actions.SAVE_PHOTO_SUCCESS,
    photos,
});

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
};
export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
};
export const updateStatus = (status: string) => async (dispatch: any, getState: any) => {
    const currentState = getState();
    dispatch(setStatus(status));
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode !== 0) {
        dispatch(setStatus(currentState.profilePage.status));
    }
};

export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
};
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
        // dispatch(
        //   stopSubmit("edit-profile", {
        //     contacts: { facebook: response.data.messages[0] },
        //   })
        // );
    }
};


type LikeCreatorActionType = {
    type: actions.TOGGLE_LIKE_POST
    postId: number
}
export const likeCreator = (postId): LikeCreatorActionType => ({
    type: actions.TOGGLE_LIKE_POST,
    postId: postId,
});

export default profileReducer;
