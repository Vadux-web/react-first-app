import { actions } from "./constans";

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 5,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userID) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };
    case actions.UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userID) {
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
    default:
      return state;
  }
};

export const followAC = (userID) => ({ type: actions.FOLLOW, userID });
export const unfollowAC = (userID) => ({
  type: actions.UNFOLLOW,
  userID,
});
export const setUsersAC = (users) => ({ type: actions.SET_USERS, users });
export const setCurrentPageAC = (currentPage) => ({
  type: actions.SET_CURRENT_PAGE,
  currentPage,
});
export const setUsersTotalCountAC = (totalUsersCount) => ({
  type: actions.SET_TOTAL_USERS_COUNT,
  count: totalUsersCount,
});

export default usersReducer;
