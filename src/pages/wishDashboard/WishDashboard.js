import "./wishDashboard.css";
import NavBar from "../../components/navBar/navBar.js";
import CenterConRight from "../../components/centerConRight/centerConRight";
import { useReducer, useCallback, useEffect } from "react";
import reducer from "../../reducers/wishDashboardReducer";
import wishPortal from "../../utils/wishContract.json";
import DP from "../../assets/profile.svg";
import { ethers } from "ethers";

const contractAddress = "0xD9Da6Be1E59641E347927193Be492357ccA6F877";
const contractABI = wishPortal.abi;
const defaultState = {
  allWishes: [],
  message: "",
  loading: false,
  chatMode: false,
  showLeft: false,
  showRight: true,
  modalDisplay: "none",
  expand: {
    address: "",
    message: "",
    time: "",
    state: false,
  },
  username: {
    complete: "",
    firstSix: "",
    lastFour: "",
    initial: "",
  },
};
function WishDashboard({ setIsWalletConnected }) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  console.log("initial state:", state);

  const getWishContract = async (ethereum) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const wishPortalContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    return wishPortalContract;
  };

  const sendWish = async (_isPrivate, wish) => {
    const wishPortalContract = await getWishContract(window.ethereum);
    console.log("kjk:", wishPortalContract);
    let txn = await wishPortalContract.makeWish(wish, _isPrivate);
    await txn.wait();
  };

  const fetchUserName = () => {
    let newUsername = JSON.parse(localStorage.getItem("userName"));
    console.log("username from fetchUsername:", newUsername);
    if (!newUsername) setIsWalletConnected(false);
    else dispatch({ type: "SET_USERNAME", payload: { newUsername } });
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <div className="mainContainer">
      <div className="homePageContainer">
        <div className="homePageInnerCon">
          <NavBar />
          <div className="centerCon">
            <div className="centerConLeft">
              <div className="greeting">
                <div className="description">
                  <h1 className="walletAddress">
                    Hi{" "}
                    <span className="shortenedAddress">
                      {state.username && state.username.firstSix}...
                      {state.username && state.username.lastFour}
                    </span>{" "}
                    ,
                  </h1>
                  How about you wave and get a cake? <br />
                  Wave to a community of blockchain developers and enthusaists
                  and you might get lucky and get some free eth sent to your
                  wallet and that's it, no bank charges, no long bank que, no
                  paper works, no government! <br />
                </div>
              </div>
              <div
                className="unreadMessage"
                onClick={() => {
                  // console.log("clicked", chatMode);
                  // setChatMode(true);
                }}
              >
                Unread Messages
              </div>
              {/* <form className="form" onSubmit={wave}>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  />
                  {loading ? (
                    <span className="sendButton">
                      <img src={spinner} alt="spinner" />
                    </span>
                  ) : (
                    <button className="sendButton" onClick={wave}>
                      <span role="img" aria-label="wave-emoji">
                        👋
                      </span>
                    </button>
                  )}
                </form> */}
            </div>

            <CenterConRight _state={state} getWishContract={getWishContract} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishDashboard;
