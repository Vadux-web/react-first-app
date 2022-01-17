import { actions } from "./constans";

const dialogsReducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_NEW_MESSAGE_BODY:
      state.newMessageBody = action.body;
      return state;

    case actions.SEND_MESSAGE:
      let newMessage = {
        id: 6,
        message: state.newMessageBody,
      };
      state.messages.push(newMessage);
      state.newMessageBody = "";
      return state;
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
