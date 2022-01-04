import { rerenderEntireTree } from "../render";

let state = {
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
  },

  friendsPage: {
    friends: [
      { id: 1, name: "Локус" },
      { id: 2, name: "Бронти" },
      { id: 3, name: "Ромашка" },
    ],
  },
};

export let addPost = (postMessage) => {
  let newPost = {
    id: 5,
    message: postMessage,
    likesCount: 0,
  };

  state.profilePage.posts.push(newPost);
  rerenderEntireTree(state);
};

export default state;
