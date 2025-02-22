import React, { useState, forwardRef, useImperativeHandle } from "react";
import { CountryData } from "../types/Country"
import CountryCard from "./CountryCard";

interface SearchBarProps {
    onSearch?: (CountryName: string) => void;
}

// Main search functionality component
const SearchBar = forwardRef<any, SearchBarProps>(({ onSearch }, ref) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [countryData, setCountryData] = useState<CountryData | null>(null);

    useImperativeHandle(ref, () => ({
        performSearch: (countryName: string) => {
            setSearchTerm(countryName);
            fetchCountry(countryName);
        }
    }))

    // Handle country search
    const fetchCountry = async (name: string = searchTerm) => {
        if (!name.trim()) {
            setError("Please enter a country name");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const formattedName = name.trim().replace(/\s+/g, '%20');
            const response = await fetch(`https://restcountries.com/v3.1/name/${formattedName}`);
          
            if (response.status === 404) {
                setError("Country not found");
                setCountryData(null);
            } else if (response.ok) {
                const data = await response.json();
                setCountryData(data[0]);
                onSearch?.(name);
            } else {
                setError("An error occurred while searching");
                setCountryData(null);
            }
        } catch (err) {
            setError("An error occurred while searching");
            setCountryData(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = () => {
        fetchCountry();
    };

    // Handle Enter key press
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className={`search-container ${countryData ? "results" : ""}`}>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className={`form-control search-input ${error ? "is-invalid" : ""}`}
                    placeholder="Enter a country"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={isLoading}
                  />
                <button 
                    className={`input-group-text search-icon ${isLoading ? "disabled" : ""}`}
                    onClick={handleSearch}
                    style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                >
                    {isLoading ? (
                        <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <i className="fi fi-tr-issue-loupe"></i>
                    )}
                </button>
            </div>
            {error && (
                <div className="invalid-country d-block mb-3">
                  {error}
                </div>
              )}
              {countryData && (
                  <div className="country-result">
                      <CountryCard country={countryData} />
                  </div>
              )}
        </div>
    );
})

export default SearchBar;