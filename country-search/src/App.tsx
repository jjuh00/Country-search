import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const DropdownMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid justify-content-end">
        <h1 className="app-name mb-0">Country Search</h1>
        <div className="dropdown">
          <button
            className="btn dropdown-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="fi fi-tr-bars-staggered"></i>
          </button>
          {isMenuOpen && (
            <div className="dropdown-menu show">
              <div className="dropdown-item d-flex justiy-content-between align-items-center">
                Dark theme &emsp;&emsp;&emsp;&emsp;&emsp;
                <i className="fi fi-ss-moon-stars"></i>
              </div>
              <div className="dropdown-item d-flex justify-content-between align-items-center">
                White theme
                <i className="fi fi-tr-brightness"></i>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

// UseEffect isn't used since fetching is done on demand (when user clicks/presses enter)
const fetchCountry = async (countryName: string): Promise<Response> => {
  const formattedName = countryName.trim().replace(/\s+/g, "%20");
  const url = `https://restcountries.com/v3.1/name/${formattedName}`;
  return fetch(url);
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a country");
      return;
    }

    // Since UseEffect isn't used, response handling is done with method(s) below
    try {
      setError(null);
      const response = await fetchCountry(searchTerm);

      if (response.status === 404) {
        setError("Country not found");
      } else if (response.ok) {
        alert("Country found!"); // Temporary alert until further implementation
      } else {
        setError("An error occured while searching");
      }
    } catch (err) {
      setError("An error occured while searching")
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="search-container">
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter a country"
          className={`form-control search-input ${error ? 'is-invalid' : ''}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <span 
        className="input-group-text search-icon"
        onClick={handleSearch}
        style={{ cursor: "pointer" }}
        >
          <i className="fi fi-tr-issue-loupe"></i>
        </span>
      </div>
      {error && (
        <div className="invalid-country d-block mt-2">
          {error}
        </div>
      )}
    </div>
  );
}

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

export {DropdownMenu, SearchBar, App}