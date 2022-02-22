//import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import WishDashboard from "./pages/wishDashboard/WishDashboard.js";
import LoginPage from "./pages/login/Login.js";

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  return (
    <div>
      {isWalletConnected ? (
        <WishDashboard setIsWalletConnected={setIsWalletConnected} />
      ) : (
        <LoginPage
          isWalletConnected={isWalletConnected}
          setIsWalletConnected={setIsWalletConnected}
        />
      )}
    </div>
  );
}

export default App;
