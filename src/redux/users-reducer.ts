import {actions} from "./constans";
import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objects-helpers";
import {UserType} from "../types/types";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, //array of users ids
};

type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case actions.FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {
                    followed: true,
                }),
            };
        case actions.UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {
                    followed: false,
                }),
            };
        case actions.SET_USERS: {
            return {
                ...state,
                users: action.users,
            };
        }
        case actions.SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage,
            };
        }
        case actions.SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.count,
            };
        }
        case actions.TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching,
            };
        }
        case actions.TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id) => id !== action.userId),
            };
        }
        default:
            return state;
    }
};

type FollowSuccessActionType = {
    type: typeof actions.FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({type: actions.FOLLOW, userId});

type UnfollowSuccessActionType = {
    type: typeof actions.UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({
    type: actions.UNFOLLOW,
    userId,
});

type SetUsersActionType = {
    type: typeof actions.SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: actions.SET_USERS, users});

type SetCurrentPageActionType = {
    type: typeof actions.SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
    type: actions.SET_CURRENT_PAGE,
    currentPage,
});

type SetTotalUsersCountActionType = {
    type: typeof actions.SET_TOTAL_USERS_COUNT
    count: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({
    type: actions.SET_TOTAL_USERS_COUNT,
    count: totalUsersCount,
});

type ToggleIsFetchingActionType = {
    type: typeof actions.TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: actions.TOGGLE_IS_FETCHING,
    isFetching,
});

type ToggleFollowingProgressActionType = {
    type: typeof actions.TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({
    type: actions.TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId,
});

export const requestUsers = (page: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    };
};

const followUnfollowFlow = async (
    dispatch: any,
    userId: number,
    apiMethod: any,
    actionCreator: any
) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId: number) => {
    return async (dispatch: any) => {
        await followUnfollowFlow(
            dispatch,
            userId,
            usersAPI.follow.bind(usersAPI),
            followSuccess
        );
    };
};

export const unfollow = (userId: number) => {
    return async (dispatch: any) => {
        await followUnfollowFlow(
            dispatch,
            userId,
            usersAPI.unfollow.bind(usersAPI),
            unfollowSuccess
        );
    };
};
export default usersReducer;
