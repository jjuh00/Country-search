import React, { useRef } from "react";
import DropdownMenu from "./components/Menu";
import SearchBar from "./components/Searchbar";
import { useSearchHistory } from "./hooks/UseHistory";

const App: React.FC = () => {
  const { searchHistory, addToHistory } = useSearchHistory();
  const searchBarRef = useRef<any>(null);

  const handleHistorySelect = (countryName: string) => {
    if (searchBarRef.current) {
      searchBarRef.current.performSearch(countryName);
    }
  };

  return (
    <div className="app-container">
      <DropdownMenu 
        onHistorySelected={handleHistorySelect}
        searchHistory={searchHistory}
      />
      <main className="main-content">
        <SearchBar 
          ref={searchBarRef}
          onSearchComplete={addToHistory}
        />
      </main>
    </div>
  )
}

export default App;