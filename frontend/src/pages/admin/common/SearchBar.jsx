import React from 'react';
import { FaSearch } from 'react-icons/fa';


const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative flex items-center bg-[#fff] w-96 rounded-l-full shadow mt-10 h-14">
      <input
        type="text"
        placeholder="Search by id..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 rounded-l-full border-gray-300"
      />
      <button className="absolute right-0 bg-gray-950 text-[#fff] h-14 w-14 flex items-center  justify-center">
        <FaSearch/>
      </button>
    </div>
  );
};

export default SearchBar;