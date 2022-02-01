import { actions } from "./constans";

let initialState = {
  users: [],
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
        users: [...state.users, ...action.users],
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

export default usersReducer;
