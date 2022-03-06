import React, { useEffect, useState } from "react";
import {  Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

function completeSearch() {
 // make network search call here
 return JSON.parse("{results: []");
}

const SearchButton = () => {
  const handleClick = () => setSearching(true);

  const [isSearching, setSearching] = useState(false);
  useEffect(() => {
   if (isSearching) {
      const results = completeSearch();
      setSearching(false);
    }
  }, [isSearching]);

  return (
    <Button 
      variant="primary"
      className="my-2"
      disabled={isSearching}
      onClick={!isSearching ? handleClick : null}
    >
      {isSearching ? "Searching..." : "Search"}
    </Button>
  );
};

export default SearchButton;

