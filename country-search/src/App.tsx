import React from "react";
import DropdownMenu from "./components/Menu";
import SearchBar from "./components/Searchbar";

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