import { useReducer } from "react";
import reducer from "../../reducers/centerConRightReducer";
import DP from "../../assets/profile.svg";

export default function CenterConRight({ _state }) {
  const [state, dispatch] = useReducer(reducer, _state);
  return (
    <>
      <div
        className="centerConRight"
        style={{ display: state.showRight ? "flex" : "none" }}
      >
        <div className="messagesHeader">
          <h1
            className="total"
            onClick={() => {
              if (state.expand.open) {
                dispatch({ type: "SET_EXPAND_STATE", payload: false });
              } else {
                return;
              }
            }}
          >
            {state.expand.open ? "〈〈 " : null}
            {state.allWishes.length}
          </h1>
          <span>Inbox</span>
        </div>
        <div className="messagesContainer">
          {state.expand.open ? (
            <div className="expandedMessageWrapper">
              <div className="expandedMessageCon">
                <h1 className="expandedMessageDp">
                  <span role="img" aria-label="wave-emoji">
                    ✉️
                  </span>
                </h1>
                <h3 className="expandedMessageAddress">
                  {state.expand.address}
                </h3>
                <h3 className="expandedMessageText">
                  "{state.expand.message}"
                </h3>
                <h3 className="expandedMessageTime">{state.expand.time} </h3>
              </div>
            </div>
          ) : (
            <>
              {state.allWishes.map((wish, key) => {
                return (
                  <div
                    className="transaction"
                    key={key}
                    onClick={() => {
                      console.log(state.expand);
                      dispatch({
                        type: "SET_EXPAND",
                        payload: {
                          state: true,
                          message: wish.message,
                          time: wish.timestamp.toString(),
                          address: wish.address,
                        },
                      });
                    }}
                  >
                    <img src={DP} alt="" className="dp" />
                    <div className="info">
                      <div className="messageWrapper">
                        <h4>{wish.address.substring(0, 6)}</h4>
                        <span className="recievedMessage">{wish.message}</span>
                      </div>
                      <span className="expand">〉</span>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}
