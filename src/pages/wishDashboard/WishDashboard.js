import "./wishDashboard.css";
import NavBar from "../../components/navBar/navBar.js";
import CenterConRight from "../../components/centerConRight/centerConRight";
import { useReducer, useCallback, useEffect } from "react";
import reducer from "../../reducers/wishDashboardReducer";
import wishPortal from "../../utils/wishContract.json";
import DP from "../../assets/profile.svg";
import { ethers } from "ethers";
import WishForm from "../../components/wishForm/wishForm";

const contractAddress = "0x6b1D67607dED73C0206809eD76D3E97484Efb971";
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
    wish: "",
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

  const responsiveness = useCallback(() => {
    if (window.innerWidth < 979) {
      dispatch({ type: "CHANGE_LAYOUT", payload: true });
    } else if (window.innerWidth > 979) {
      dispatch({ type: "CHANGE_LAYOUT", payload: false });
    }
  });

  //window.addEventListener("resize", responsiveness);

  const fetchUserName = () => {
    let newUsername = JSON.parse(localStorage.getItem("userName"));
    if (!newUsername) setIsWalletConnected(false);
    else dispatch({ type: "SET_USERNAME", payload: { ...newUsername } });
  };

  useEffect(() => {
    window.addEventListener("resize", responsiveness);
    return () => {
      window.removeEventListener("resize", responsiveness);
    };
  });

  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <div className="mainContainer">
      <div className="homePageContainer">
        <div className="homePageInnerCon">
          <NavBar />
          <div
            className="centerCon"
            style={{ flexDirection: state.columnLayout ? "column" : "row" }}
          >
            <div className="centerConLeft">
              <div className="greeting">
                <div className="description">
                  <h1 className="walletAddress">
                    Hi{" "}
                    <span className="shortenedAddress">
                      {state.username.firstSix}...
                      {state.username.lastFour}
                    </span>{" "}
                    ,
                  </h1>
                  In many countries, it's believed that “if you make a wish as
                  you toss a coin or a pebble into a well, it may come true."
                  Let the blockchain be your well. 😊.
                  <br></br>
                  <br></br>
                  <i>N/B: Private wishes would only be seen by you.</i>
                  <br />
                </div>
              </div>
              <WishForm getWishContract={getWishContract}></WishForm>
            </div>

            <CenterConRight _state={state} getWishContract={getWishContract} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishDashboard;
