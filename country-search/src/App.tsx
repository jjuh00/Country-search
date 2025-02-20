import React from "react";
import DropdownMenu from "./components/Menu";
import SearchBar from "./components/Searchbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <DropdownMenu />
      <main className="main-content">
        <SearchBar />
      </main>
    </div>
  )
}

export default App;