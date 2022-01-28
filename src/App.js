import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import WishDashboard from "./pages/wishDashboard/WishDashboard";
import LoginPage from "./pages/login/login";

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  return (
    <div>
      {isWalletConnected ? (
        <WishDashboard />
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
