import profileReducer, { addPostCreator, deletePost } from "./profile-reducer";

let state = {
  posts: [
    {
      id: 1,
      message: "Готовиться всем: марафонский метод Хансонов",
      likesCount: 15,
    },
    {
      id: 2,
      message: "Crazy Owl 11-12 июня 2022",
      likesCount: 20,
    },
    {
      id: 3,
      message: "GRUT T80",
      likesCount: 24,
    },
    {
      id: 4,
      message: "Сочи Хока 85 км, 10 сентября",
      likesCount: 28,
    },
  ],
};

it("length of post should bee incremented", () => {
  //1. test data
  let action = addPostCreator("privet");
  //2. action
  let newState = profileReducer(state, action);

  //3. expectation
  expect(newState.posts.length).toBe(5);
});

it("message of new post should bee correct", () => {
  //1. test data
  let action = addPostCreator("privet");

  //2. action
  let newState = profileReducer(state, action);

  //3. expectation
  expect(newState.posts[4].message).toBe("privet");
});

it("after deleting length of messages should be decrement", () => {
  //1. test data
  let action = deletePost(1);

  //2. action
  let newState = profileReducer(state, action);

  //3. expectation
  expect(newState.posts.length).toBe(3);
});

it("after deleting length of messages shouldn't be decrement if id is incorrect", () => {
  //1. test data
  let action = deletePost(1000);

  //2. action
  let newState = profileReducer(state, action);

  //3. expectation
  expect(newState.posts.length).toBe(4);
});
