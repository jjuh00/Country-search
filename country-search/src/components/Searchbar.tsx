import React, { useState } from "react";
import { fetchCountry } from "./Api";

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

export default SearchBar;