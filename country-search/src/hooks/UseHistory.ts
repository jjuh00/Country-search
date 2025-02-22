// Utility functions for managing search history by using localStorage
import { useState, useEffect } from "react";
import { SearchHistoryItem } from "../types/History";

const HISTORY_KEY = "countrySearchHistory"
const MAX_ITEMS = 10;

export const useSearchHistory = () => {
    const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>(() => {
        const savedHistory = localStorage.getItem(HISTORY_KEY);
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    useEffect (() => {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistory));
    }, [searchHistory]);

    const addToHistory = (countryName: string) => {
        // Add a new item and only keep last 10 searches
        setSearchHistory(prevHistory => {
            const newHistory = [
                { countryName, time: Date.now() },
                ...prevHistory.filter(item => item.countryName !== countryName)
            ].slice(0, MAX_ITEMS);
            return newHistory;
        });
    };

    return { searchHistory, addToHistory };
}