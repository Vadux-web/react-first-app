import { actions } from "./constans";

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
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
    case actions.TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    default:
      return state;
  }
};

export const follow = (userID) => ({ type: actions.FOLLOW, userID });
export const unfollow = (userID) => ({
  type: actions.UNFOLLOW,
  userID,
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

export default usersReducer;
