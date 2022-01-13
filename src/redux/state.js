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
      newMessageText: "New Message Text",
    },

    friendsPage: {
      friends: [
        { id: 1, name: "Локус" },
        { id: 2, name: "Бронти" },
        { id: 3, name: "Ромашка" },
      ],
    },
  },
  getState() {
    return this._state;
  },
  _callSubscriber() {
    console.log("State changed");
  },
  addPost() {
    let newPost = {
      id: 5,
      message: this._state.profilePage.newPostText,
      likesCount: 0,
    };
    this._state.profilePage.posts.push(newPost);
    this._state.profilePage.newPostText = "";
    this._callSubscriber(this._state);
  },
  updateNewPostText(newText) {
    this._state.profilePage.newPostText = newText;
    this._callSubscriber(this._state);
  },
  addMessage() {
    let newMessage = {
      id: 6,
      message: this._state.dialogsPage.newMessageText,
    };
    this._state.dialogsPage.messages.push(newMessage);
    this._state.dialogsPage.newMessageText = "";
    this._callSubscriber(this._state);
  },
  updateNewMessageText(newText) {
    this._state.dialogsPage.newMessageText = newText;
    this._callSubscriber(this._state);
  },
  subscribe(observer) {
    this._callSubscriber = observer;
    //наблюдатель, observer (паттерн addEventListener)
  },
};

export default store;
window.store = store;
