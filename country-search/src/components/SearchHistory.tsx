import React from "react";
import { SearchHistoryItem } from "../types/History";

interface SearchHistoryProps {
    history: SearchHistoryItem[];
    onCountrySelected: (countryName: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onCountrySelected }) => {
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
                                <span className="seaech-time">{new Date(item.time).toLocaleDateString()}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}