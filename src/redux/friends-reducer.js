let initialState = {
  friends: [
    { id: 1, name: "Локус" },
    { id: 2, name: "Бронти" },
    { id: 3, name: "Ромашка" },
  ],
};

const friendsReducer = (state = initialState, action) => {
  return state;
};

export default friendsReducer;
