import { actions } from "./constans";
// import { authAPI } from "../api/api";
// import { stopSubmit } from "redux-form";
import { getAuthUserData } from "./auth-reducer";

type initialStateType = {
  initialized: boolean;
};

let initialState: initialStateType = {
  initialized: false,
};

const appReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case actions.INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

type initializedSuccessActionType = {
  type: typeof actions.INITIALIZED_SUCCESS;
};

export const initializedSuccess = (): initializedSuccessActionType => ({
  type: actions.INITIALIZED_SUCCESS,
});

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess());
  });
};

export default appReducer;
