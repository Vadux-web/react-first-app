import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import friendsReducer from "./friends-reducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        {
          id: 1,
          message:
            "Афера космического ботаника: Как Илон Маск украл у России многоразовую ракету",
          likesCount: 15,
        },
        {
          id: 2,
          message: "Готовиться всем: тревожная новость от Мишустина",
          likesCount: 20,
        },
      ],
      newPostText: "New Post Text",
    },
    dialogsPage: {
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
    },

    friendsPage: {
      friends: [
        { id: 1, name: "Локус" },
        { id: 2, name: "Бронти" },
        { id: 3, name: "Ромашка" },
      ],
    },
  },
  _callSubscriber() {
    console.log("State changed");
  },

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.friendsPage = friendsReducer(this._state.friendsPage, action);
    this._callSubscriber(this._state);
  },
};

export default store;
window.store = store;
