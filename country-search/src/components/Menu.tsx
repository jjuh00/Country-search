import React, { useState } from "react";

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
                History &emsp;&emsp;&emsp;&emsp;&emsp;
                <i className="fi fi-ss-time-past"></i>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default DropdownMenu;