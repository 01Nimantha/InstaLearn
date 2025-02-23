import React, { useState } from 'react';

const SearchBar = ({ setSearchTerm }) => {
    const [inputValue, setInputValue] = useState("");

    const handleSearch = () => {
        setSearchTerm(inputValue.trim()); // Ensure trimmed search term is set
    };

    return (
        <div className="flex border rounded-lg w-full overflow-hidden">
            <input
                type="text"
                className="p-2 w-full border-none focus:outline-none"
                placeholder="Enter Student ID..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Pressing Enter triggers search
            />
            <button 
                onClick={handleSearch} 
                className="bg-[#287f93] text-white px-4 py-2"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
