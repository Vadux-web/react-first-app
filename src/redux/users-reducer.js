import { actions } from "./constans";
import { usersAPI } from "../api/api";

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };
    case actions.UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: false };
          }
          return user;
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

export const followSuccess = (userId) => ({ type: actions.FOLLOW, userId });
export const unfollowSuccess = (userId) => ({
  type: actions.UNFOLLOW,
  userId,
});
export const setUsers = (users) => ({ type: actions.SET_USERS, users });
export const setCurrentPage = (currentPage) => ({
  type: actions.SET_CURRENT_PAGE,
  currentPage,
});
export const setTotalUsersCount = (totalUsersCount) => ({
  type: actions.SET_TOTAL_USERS_COUNT,
  count: totalUsersCount,
});
export const toggleIsFetching = (isFetching) => ({
  type: actions.TOGGLE_IS_FETCHING,
  isFetching,
});
export const toggleFollowingProgress = (isFetching, userId) => ({
  type: actions.TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

export const getUsers = (currentPage, pageSize) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    usersAPI.getUsers(currentPage, pageSize).then((data) => {
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount));
      dispatch(setCurrentPage(currentPage));
    });
  };
};

export const follow = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId));

    usersAPI.follow(userId).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(followSuccess(userId));
      }
      dispatch(toggleFollowingProgress(false, userId));
    });
  };
};

export const unfollow = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId));

    usersAPI.unfollow(userId).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(unfollowSuccess(userId));
      }
      dispatch(toggleFollowingProgress(false, userId));
    });
  };
};

export default usersReducer;
