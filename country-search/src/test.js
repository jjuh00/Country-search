import "@testing-library/jest-dom";
import { enableFetchMocks } from "jest-fetch-mock";
import { render, screen, fireEvent, waitFor, renderHook } from "@testing-library/react";
import App from "./App";
import SearchBar from "./components/Searchbar";
import CountryCard from "./components/CountryCard";
import SearchHistory from "./components/SearchHistory";
import DropdownMenu from "./components/Menu";
import { useSearchHistory } from "./hooks/UseHistory";

// I encountered some erros and bugs (which I couldn't fix) 
// when trying to write this test with TypeScript, 
// which is why this test is done with JavaScript instead of TS.

// Mock data
const mockCountryData = {
    name: {
        common: "Finland",
        official: "Republic of Finland",
        nativeName: {
            fin: {
                official: "Suomen tasavalta",
                common: "Suomi"
            }
        }
    },
    subregion: "Northern Europe",
    languages: {
        fin: "Finnish"
    },
    currencies: {
        EUR: {
            name: "Euro",
            symbol: "€"
        }
    },
    area: 338424.0,
    borders: ["NOR", "SWE", "RUS"],
    continents: ["Europe"]
};

// Test Suite 1: App component
describe("App Component", () => {
    test("renders main components", () => {
        render(<App />);
        expect(screen.getByText("Country Search")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter a country")).toBeInTheDocument()
    });
});

// Test Suite 2: Searchbar component
describe("SearchBar Component", () => {
    enableFetchMocks();
    
    beforeEach(() => {
        fetch.resetMocks();
    });

    test("renders search input", () => {
        render(<SearchBar />);
        expect(screen.getByPlaceholderText("Enter a country")).toBeInTheDocument();
    });

    test("handles empty input for search", async () => {
        render(<SearchBar />);
        fireEvent.click(screen.getByRole("button"));
        expect(fetch).not.toHaveBeenCalled();
        expect(screen.getByText("Please enter a country name")).toBeInTheDocument();
    });

    test("handles search with spaces", async () => {
        fetch.mockResponseOnce(JSON.stringify([mockCountryData]));

        render(<SearchBar />);
        const input = screen.getByPlaceholderText("Enter a country");
        fireEvent.change(input, { target: { value : "Fin land" } });
        fireEvent.click(screen.getByRole("button"));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith("https://restcountries.com/v3.1/name/Fin%20land");
        });
    });

    test("handles Enter key press", async () => {
        fetch.mockResponseOnce(JSON.stringify([mockCountryData]));

        render(<SearchBar />);
        const input = screen.getByPlaceholderText("Enter a country");
        fireEvent.change(input, { target: { value : "Finland" } });
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

        await waitFor(() => {
            expect(fetch).toHaveBeenCalled();
        });
    });
    
    test("handles successful search", async () => {
        fetch.mockResponseOnce(JSON.stringify([mockCountryData]));
        const onSearch = jest.fn();

        render(<SearchBar onSearch={onSearch} />);
        
        const input = screen.getByPlaceholderText("Enter a country");
        fireEvent.change(input, { target: { value: "Finland" } });
        fireEvent.click(screen.getByRole("button"));

        await waitFor(() => {
            expect(screen.getByText("Finland")).toBeInTheDocument();
            expect(screen.getByText("Suomen tasavalta")).toBeInTheDocument();
            expect(onSearch).toHaveBeenCalledWith("Finland")
        });
    });

    test("handles country not found", async () => {
        fetch.mockResponseOnce("", { status: 404 });

        render(<SearchBar />);

        const input = screen.getByPlaceholderText("Enter a country");
        fireEvent.change(input, { target: { value: "asdfgh" } });
        fireEvent.click(screen.getByRole("button"));

        await waitFor(() => {
            expect(screen.getByText("Country not found")).toBeInTheDocument();
        });
    });

    test("handles API error", async () => {
        fetch.mockRejectOnce(new Error("API Error"));

        render(<SearchBar />);

        const input = screen.getByPlaceholderText("Enter a country");
        fireEvent.change(input, { target: { value: "asdfgh" } });
        fireEvent.click(screen.getByRole("button"));

        await waitFor(() => {
            expect(screen.getByText("An error occurred while searching")).toBeInTheDocument();
        });
    });
});

// Test Suite 3: Countrycard component
describe("CountryCard Component", () => {
    test("renders country information correctly", () => {
        render(<CountryCard country={mockCountryData} />);

        // Names, region, language(s), currency, area, and borders
        expect(screen.getByText("Finland")).toBeInTheDocument();
        expect(screen.getByText("Suomen tasavalta")).toBeInTheDocument();
        expect(screen.getByText("Northern Europe, Europe")).toBeInTheDocument();
        expect(screen.getByText("Finnish")).toBeInTheDocument();
        expect(screen.getByText("Euro (€)")).toBeInTheDocument();
        expect(screen.getByText("338 424 km²")).toBeInTheDocument();
        expect(screen.getByText("NOR, SWE, RUS")).toBeInTheDocument();
    });

    test("handles same subregion and continent", () => {
        const sameRegionAndContinent = {
            ...mockCountryData,
            subregion: "Europe",
            continents: ["Europe"]
        };
        render(<CountryCard country={sameRegionAndContinent} />);
        expect(screen.getByText("Europe")).toBeInTheDocument();
        // Should not show "Europe, Europe"
        expect(screen.queryByText("Europe, Europe")).not.toBeInTheDocument();
    });
});

// Test Suite 4: Search history component
describe("SearchHistory Component", () => {
    const mockHistory = [
        { countryName: "Finland", time: Date.now() },
        { countryName: "Sweden", time: Date.now() - 1000 }
    ];

    test("renders empty history message when there isn't history", () => {
        render(<SearchHistory history={[]} onCountrySelected={() => {}} />);
        expect(screen.getByText("No recent searches")).toBeInTheDocument();
    });

    test("renders history items correctly", () => {
        render(<SearchHistory history={mockHistory} onCountrySelected={() => {}} />);
        expect(screen.getByText("Finland")).toBeInTheDocument();
        expect(screen.getByText("Sweden")).toBeInTheDocument();
    });

    test("calls onCountrySelected when history item is clicked", () => {
        const onCountrySelected = jest.fn();
        render(<SearchHistory history={mockHistory} onCountrySelected={onCountrySelected} />);

        fireEvent.click(screen.getByText("Finland"));
        expect(onCountrySelected).toHaveBeenCalledWith("Finland");
    });   
});

// Test Suite 5: Dropdown menu component
describe("DropdownMenu Component", () => {
    const mockOnHistorySelected = jest.fn();

    const mockHistory = [
        { countryName: "Finland", time: Date.now() }
    ];

    test("renders menu button", () => {
        render(<DropdownMenu onHistorySelected={() => {}} searchHistory={[]} />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    test("toggles dropdown menu on button click", () => {
        render(<DropdownMenu onHistorySelected={mockOnHistorySelected} searchHistory={mockHistory} />);

        // Check dropdown menu opening and closing
        fireEvent.click(screen.getByRole("button"));
        expect(screen.getByText("History")).toBeInTheDocument();
        expect(screen.getByText("Finland")).toBeInTheDocument();
        fireEvent.click(screen.getByRole("button"));
        expect(screen.queryByText("History")).not.toBeInTheDocument();
    });

    test("calls onHistorySelected when history item is clicked", () => {
        const onHistorySelected = jest.fn();
        render(<DropdownMenu onHistorySelected={onHistorySelected} searchHistory={mockHistory} />);

        // Check that dropdown menu/history items are on the list
        fireEvent.click(screen.getByRole("button"));
        fireEvent.click(screen.getByText("Finland"));
        expect(onHistorySelected).toHaveBeenCalledWith("Finland");
    });
});

// Test Suite 6: Search history hook
describe("useSearchHistory Hook", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test("initializes with empty history", () => {
        const { result } = renderHook(() => useSearchHistory());
        expect(result.current.searchHistory).toEqual([]);
    });

    test("adds items to history", async () => {
        const { result } = renderHook(() => useSearchHistory());

        await waitFor(() => {
            result.current.addToHistory("Finland");
        });

        await waitFor(() => {
            expect(result.current.searchHistory).toHaveLength(1);
            expect(result.current.searchHistory[0].countryName).toBe("Finland");
        });
    });

    test("loads history from localStorage on initialization", () => {
        const initialHistory = [{ countryName: "Finland", time: Date.now() }];
        localStorage.setItem("countrySearchHistory", JSON.stringify(initialHistory));

        const { result } = renderHook(() => useSearchHistory());
        expect(result.current.searchHistory).toHaveLength(1);
        expect(result.current.searchHistory[0].countryName).toBe("Finland");
    });

    test("maintains maximum history size", async () => {
        const { result } = renderHook(() => useSearchHistory());

        await waitFor(() => {
            for (let i = 0; i < 12; i++) {
                result.current.addToHistory(`Country${i}`);
            }
        });

        expect(result.current.searchHistory.length).toBe(10);
    });
});

// Test Suite 7: Integration tests
describe("App integration", () => {
    enableFetchMocks();

    beforeEach(() => {
        localStorage.clear();
        fetch.resetMocks();
    });

    test("full search and history workflow", async () => {
        fetch.mockResponseOnce(JSON.stringify([mockCountryData]));

        render(<App />);

        // Define correct buttons and perform initial search
        const input = screen.getByPlaceholderText("Enter a country");
        fireEvent.change(input, { target: { value: "Finland" } });
        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[1]); // Assume second button is the search button

        // Verify country data loading into the page
        await waitFor(() => {
            expect(screen.getByText("Finland")).toBeInTheDocument();
            expect(screen.getByText("Suomen tasavalta")).toBeInTheDocument();
        });

        // Open history and verify an entry
        fireEvent.click(buttons[0]); // Assume first button is the dropdown toggle
        expect(screen.getByText("Finland", { selector : ".country-name" })).toBeInTheDocument();

        // Select country from history
        fireEvent.click(screen.getByText("Finland", { selector: ".country-name" }));

        // Verify search is perfomed again
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(2);
        })
    });
});