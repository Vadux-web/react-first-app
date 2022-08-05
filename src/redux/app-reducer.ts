import {actions} from "./constans";
import {getAuthUserData} from "./auth-reducer";

export type InitialStateType = {
    initialized: boolean;
}

let initialState: InitialStateType = {
    initialized: false,
};

const appReducer = (state = initialState, action: any): InitialStateType => {
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

type InitializedSuccessActionType = {
    type: typeof actions.INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({
    type: actions.INITIALIZED_SUCCESS,
});

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess());
    });
};

export default appReducer;
