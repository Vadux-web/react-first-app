import { actions } from "./constans";
import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

type initialStateType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  captchaUrl: string | null;
};

let initialState: initialStateType = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case actions.SET_USER_DATA:
    case actions.GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
        // Косяк       userId: "name",
      };

    default:
      return state;
  }
};

type setAuthUserDataActionPayloadType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

type setAuthUserDataActionType = {
  type: typeof actions.SET_USER_DATA;
  payload: setAuthUserDataActionPayloadType;
};

export const setAuthUserData = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): setAuthUserDataActionType => ({
  type: actions.SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

type getCaptchaUrlSuccessActionType = {
  type: typeof actions.GET_CAPTCHA_URL_SUCCESS;
  payload: { captchaUrl: string };
};

export const getCaptchaUrlSuccess = (
  captchaUrl: string
): getCaptchaUrlSuccessActionType => ({
  type: actions.GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

export const getAuthUserData = () => async (dispatch: any) => {
  let response = await authAPI.me();

  if (response.data.resultCode === 0) {
    let { id, email, login } = response.data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
) => async (dispatch: any) => {
  let response = await authAPI.login(email, password, rememberMe, captcha);
  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    let message =
      response.data.messages.length > 0
        ? response.data.messages[0]
        : "Some error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};

export const getCaptchaUrl = () => async (dispatch: any) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export const logout = () => async (dispatch: any) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
