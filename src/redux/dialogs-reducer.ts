import {actions} from "./constans"

type DialogType = {
    id: number
    name: string
    src: string
}

type MessageType = {
    id: number
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: "Джек", src: "https://img.fredtvshow.com/img/tv/9448/samurai-jack-premiere.jpg"},
        {
            id: 2,
            name: "Тардис",
            src: "https://www.giantfreakinrobot.com/wp-content/uploads/2020/11/tardis-doctor-who-1536x864.jpg"
        },
        {id: 3, name: "Ромашка", src: "https://mobimg.b-cdn.net/v3/fetch/77/774d3dc220eb272b515123fa72efd9c3.jpeg"},
        {id: 4, name: "Василек", src: "https://bipbap.ru/wp-content/uploads/2018/08/sadovyi-tsvetok-vasilki.jpg"},
        {id: 5, name: "Курочка", src: "https://kg-portal.ru/img/80379/main_2x.jpg"},
        {id: 6, name: "Бильбо", src: "https://i53.servimg.com/u/f53/19/18/79/09/410.jpg"},
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "Hi are you?"},
        {id: 3, message: "I'm ok!"},
        {id: 4, message: "how?"},
        {id: 5, message: "Ok"},
    ] as Array<MessageType>,
    newMessageBody: null,  ////TODO это я сам решил так типизировать...
};

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case actions.UPDATE_NEW_MESSAGE_BODY:
            return {...state, newMessageBody: action.body};

        case actions.SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}],
            };
        default:
            return state;
    }
};

type SendMessageCreatorActionType = {
    type: typeof actions.SEND_MESSAGE
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => ({
    type: actions.SEND_MESSAGE,
    newMessageBody,
});

type updateNewMessageBodyCreatorActionType = {
    type: typeof actions.UPDATE_NEW_MESSAGE_BODY
    body: string
}

export const updateNewMessageBodyCreator = (body): updateNewMessageBodyCreatorActionType => ({
    type: actions.UPDATE_NEW_MESSAGE_BODY,
    body: body,
});

export default dialogsReducer;
