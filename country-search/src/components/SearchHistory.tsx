import React from "react";
import { SearchHistoryItem } from "../types/History";

interface SearchHistoryProps {
    history: SearchHistoryItem[];
    onCountrySelected: (countryName: string) => void;
}

// Component for displaying search history (which can be found from dropdown menu)
const SearchHistory: React.FC<SearchHistoryProps> = ({ history = [], onCountrySelected }) => {
    // Runtime check
    if (!Array.isArray(history)) {
        console.warn("History prop is not an array");
    }

    return (
        <div className="history-card">
            <div className="history-header">
                <h3>Search History</h3>
            </div>
            <div className="history-content">
                {history.length === 0 ? (
                    <p className="no-history">No recent searches</p>
                ) : (
                    <ul className="history-list">
                        {history.map((item, i) => (
                            <li key={item.time + i} onClick={() => onCountrySelected(item.countryName)}>
                                <span className="country-name">{item.countryName}</span>
                                <span className="search-time">{new Date(item.time).toLocaleDateString()}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default SearchHistory;