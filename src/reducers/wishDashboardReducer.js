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

  if (action.type === "SET_USERNAME") {
    console.log("before set username:", state);
    let newState = { ...state, username: action.payload };
    console.log("after set username:", newState);
    return newState;
  }
}
