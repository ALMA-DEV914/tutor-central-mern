import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

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
      variant="primary"
      className="my-2"
      disabled={isSearching}
      onClick={!isSearching ? handleClick : null}
    >
      {isSearching ? "Searching..." : "Search"}
    </Button>
  );
};

// const SearchBar = ({ searchQuery, setSearchQuery }) => {
const SearchBar = () => {
  // const navigate = useNavigate();
  // const onSubmit = (e) => {
  //   navigate.push(`?s=${searchQuery}`);
  //   e.preventDefault();
  // };
  const [query, setQuery] = useState("");
  // function setQuery(e) {
  //   e.preventdefault();
  //   console.log(e.target);
  //   query = "";
  // }
  return (
    <>
      <Form>
        <Form.Group className="search" controlId="formBasicEmail">
          <Form.Label>Find a Tutor</Form.Label>
          <Form.Control
            // value={searchQuery}
            // onInput={(e) => setSearchQuery(e.target.value)}
            // id="header-search"
            // name="s"
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            placeholder="What subject do you need help with"
          />
        </Form.Group>
        <SearchButton />
      </Form>
      {/* Add search results component here */}
    </>
  );
};

export default SearchBar;
