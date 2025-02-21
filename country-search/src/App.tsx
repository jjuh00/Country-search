import React, { useRef } from "react";
import DropdownMenu from "./components/Menu";
import SearchBar from "./components/Searchbar";
import { useSearchHistory } from "./hooks/UseHistory";

const App: React.FC = () => {
    // Custom hook to manage search history
    const { searchHistory, addToHistory } = useSearchHistory();
    const searchBarRef = useRef<any>(null);

    // Function to handle a country search from search history
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
                onSearch={addToHistory}
              />
          </main>
      </div>
    );
}

export default App;