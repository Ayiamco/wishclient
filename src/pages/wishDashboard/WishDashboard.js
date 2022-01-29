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
  showRight: false,
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

  const getAllWishes = useCallback(async () => {
    console.log("getting all wishes....");
    try {
      const { ethereum } = window;
      console.log("1");
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        console.log("2");
        const signer = provider.getSigner();
        console.log("3");
        const wishPortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log("4");

        console.log("wishportal contract:", wishPortalContract);
        const wishes = await wishPortalContract.getPublicWishes();
        console.log("wishes gotten from blockchain: ", wishes);

        let wishesArray = [];

        wishes.forEach((wish) => {
          console.log(wish);
          wishesArray.push({
            address: wish.waiver,
            timestamp: new Date(wish.timeStamp * 1000),
            message: wish.message,
          });
        });

        dispatch({
          type: "SET_ALL_WISHES",
          payload: { wishes: wishesArray.reverse() },
        });

        // wishPortalContract.on("NewWave", (from, timestamp, message) => {
        //   console.log("New Wave ", from, timestamp, message);

        //   setAllWaves((prevState) => [
        //     ...prevState,
        //     {
        //       address: from,
        //       timestamp: new Date(timestamp * 1000),
        //       message: message,
        //     },
        //   ]);
        // });
      }
    } catch (error) {
      console.log(error);
    }
  }, [contractABI]);

  const fetchUserName = () => {
    let newUsername = JSON.parse(localStorage.getItem("userName"));
    console.log("username from fetchUsername:", newUsername);
    if (!newUsername) setIsWalletConnected(false);
    else dispatch({ type: "SET_USERNAME", payload: { newUsername } });
  };

  useEffect(() => {
    fetchUserName();
    getAllWishes();
  }, [getAllWishes]);

  return (
    <div className="mainContainer">
      <div className="homePageContainer">
        <div className="homePageInnerCon">
          <NavBar />
          <div className="centerCon">
            {/* <div className="centerConLeft">
              <div className="greeting">
                <div className="description">
                  <h1 className="walletAddress">
                    Hi{" "}
                    <span className="shortenedAddress">
                      {username && username.firstSix}...
                      {username && username.lastFour}
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
                  console.log("clicked", chatMode);
                  setChatMode(true);
                }}
              >
                Unread Messages
              </div>
              <form className="form" onSubmit={wave}>
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
              </form>
            </div> */}
            <CenterConRight _state={state} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishDashboard;
