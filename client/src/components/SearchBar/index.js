import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const SearchBar = () => {
  //get categories from redux store

  const [searchInput, setSearchInput] = useState("");
  const handleSearchInputChange = (event) => {
    //filter the categories and update redux store based on user input
    const { value } = event.target;
    setSearchInput(value);
  };

  return (
    <>
      <div className='searchbar'>
        <input
          className='form-input'
          type='search'
          placeholder='Search subjects...'
          onChange={handleSearchInputChange}
          value={searchInput}
        />
        <span
          className='input'
          style={{
            border: "1px solid #e5e5e5",
            borderRadius: "0.25rem",
          }}
        >
          <div className='btn-search'>
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </span>
      </div>
    </>
  );
};

export default SearchBar;
