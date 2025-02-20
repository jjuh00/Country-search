import React, { useState } from "react";
import SearchHistory from "./SearchHistory";
import { SearchHistoryItem } from "../types/History";

interface MenuProps {
  onHistorySelected: (countryName: string) => void;
  searchHistory: SearchHistoryItem[];
}

const DropdownMenu: React.FC<MenuProps> = ({ onHistorySelected, searchHistory }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <h1 className="mb-0">Country Search</h1>
        <div className="dropdown ms-auto">
          <button
            className="btn dropdown-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="fi fi-tr-bars-staggered"></i>
          </button>
          {isMenuOpen && (
            <div className="dropdown-menu show">
              <div className="dropdown-item d-flex justiy-content-between align-items-center" onClick={() => {}}>
                History &emsp;&emsp;&emsp;&emsp;&emsp;
                <i className="fi fi-ss-time-past ms-2"></i>
              </div>
              <SearchHistory
                history={searchHistory}
                onCountrySelected={(countryName) => {
                  onHistorySelected(countryName);
                  setIsMenuOpen(false);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default DropdownMenu;