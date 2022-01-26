import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/navBar/navBar";

function App() {
  return (
    <div className="mainContainer">
      <div className="homePageContainer">
        <div className="homePageInnerCon">
          <NavBar />
        </div>
      </div>
    </div>
  );
}

export default App;
