import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";

const DropdownMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid justify-content-end">
        <h1 className="mb-0">Country Search</h1>
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

export default DropdownMenu;