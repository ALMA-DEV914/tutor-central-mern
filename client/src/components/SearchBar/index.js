import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

async function completeSearch() {
  //make network search call here
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
      variant='primary'
      disabled={isSearching}
      onClick={!isSearching ? handleClick : null}
    >
      {isSearching ? "Searching..." : "Search"}
    </Button>
  );
};

const SearchBar = () => {
  return (
    <>
      <Form>
        <Form.Group className='search' controlId='formBasicEmail'>
          <Form.Label>Find a Tutor</Form.Label>
          <Form.Control
            type='text'
            placeholder='What subject do you need help with'
          />
        </Form.Group>
        <SearchButton />
      </Form>
      {/* Add search results component here */}
    </>
  );
};

export default SearchBar;
