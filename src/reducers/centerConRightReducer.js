export default function reducer(state, action) {
  if (action.type === "SET_EXPAND_STATE") {
    let newState = {
      ...state,
      expand: { ...state.expand, open: action.payload },
    };
    return newState;
  }

  if (action.type === "SET_EXPAND") {
    let newState = { ...state, expand: action.payload };
    return newState;
  }

  if (action.type === "SET_ALL_WISHES") {
    console.log("before:", state);
    let newState = { ...state, allWishes: action.payload.wishes };
    console.log("newState:", newState);
    return newState;
  }
}
