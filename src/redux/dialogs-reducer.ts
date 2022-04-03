import lokus from "../assets/images/avatars/lokus.jpg";
import bronti from "../assets/images/avatars/bronti.jpeg";
import b1000 from "../assets/images/avatars/b1000.jpeg";

const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";

type DialogType = { id: number; name: string; src: string | null }; //HTMLImageElement

type MessageType = {
  id: number;
  message: string;
};

type InitialStateType = {
  dialogs: Array<DialogType>;
  messages: Array<MessageType>;
  newMessageBody?: string;
};

let initialState: InitialStateType = {
  dialogs: [
    { id: 1, name: "Локус", src: lokus },
    { id: 2, name: "Бронти", src: bronti },
    { id: 3, name: "Ромашка", src: null },
    { id: 4, name: "Василек", src: null },
    { id: 5, name: "Курочка", src: null },
    { id: 6, name: "Бильбо1000", src: b1000 },
  ],
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "Hi are you?" },
    { id: 3, message: "I'm ok!" },
    { id: 4, message: "how?" },
    { id: 5, message: "Ok" },
  ],
};

const dialogsReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      return { ...state, newMessageBody: action.body };

    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: body }],
      };
    default:
      return state;
  }
};

type ActionsTypes =
  | SendMessageCreatorActionType
  | UpdateNewMessageBodyCreatorActionType;

type SendMessageCreatorActionType = {
  type: typeof SEND_MESSAGE;
  newMessageBody: string;
};

export const sendMessageCreator = (
  newMessageBody: string
): SendMessageCreatorActionType => ({
  type: SEND_MESSAGE,
  newMessageBody,
});

type UpdateNewMessageBodyCreatorActionType = {
  type: typeof UPDATE_NEW_MESSAGE_BODY;
  body: string;
};

export const updateNewMessageBodyCreator = (
  body
): UpdateNewMessageBodyCreatorActionType => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  body: body,
});

export default dialogsReducer;
