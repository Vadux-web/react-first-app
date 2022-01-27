import { actions } from "./constans";

let initialState = {
  dialogs: [
    { id: 1, name: "Локус", src: "/src/images/avatars/lokus.jpg" },
    { id: 2, name: "Бронти", src: "../images/avatars/bronti.jpeg" },
    { id: 3, name: "Ромашка", src: "../images/avatars/rom.jpeg" },
    { id: 4, name: "Василек", src: "../images/avatars/vas.jpeg" },
    { id: 5, name: "Курочка", src: "../images/avatars/coco.jpeg" },
    { id: 6, name: "Бильбо1000", src: "../images/avatars/b1000.jpeg" },
  ],
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "Hi are you?" },
    { id: 3, message: "I'm ok!" },
    { id: 4, message: "how?" },
    { id: 5, message: "Ok" },
  ],
  newMessageBody: "New Message Text",
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_NEW_MESSAGE_BODY:
      return { ...state, newMessageBody: action.body };

    case actions.SEND_MESSAGE:
      let body = state.newMessageBody;
      return {
        ...state,
        newMessageBody: "",
        messages: [...state.messages, { id: 6, message: body }],
      };
    default:
      return state;
  }
};

export const sendMessageCreator = () => ({ type: actions.SEND_MESSAGE });
export const updateNewMessageBodyCreator = (body) => ({
  type: actions.UPDATE_NEW_MESSAGE_BODY,
  body: body,
});

export default dialogsReducer;
