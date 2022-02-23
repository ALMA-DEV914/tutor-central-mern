import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import './searchbar.css';
const ucblogo = require ('../../assets/buc.jpeg')
const uscedulogo = require('../../assets/usc.png');
const pulogo = require('../../assets/pu.jpeg');
const mitlogo = require('../../assets/MIT-logo-01-1.png');
const yalelogo = require('../../assets/yale.png');



const SearchBar = () => {
    //get categories from redux store

    const [searchInput, setSearchInput] = useState("");
    const handleSearchInputChange = (event) => {
        //filter the categories and update redux store based on user input
        const { value } = event.target;
        setSearchInput(value);
    };
    const ucb = "https://www.berkeley.edu/";
    const uscedu = "https://www.usc.edu/";
    const mit = "https://web.mit.edu/";
    const pu = "https://www.princeton.edu/";
    const yale ="https://www.yale.edu/";
    return (
        <>
            <div className="searchbar">
                <input
                    className="form-input"
                        type="search"
                        placeholder="Search here...." href=''
                        onChange={handleSearchInputChange}
                        value={searchInput}
                                />
                                <span
                                    className="input"
                                    style={{
                                        border: "1px solid #e5e5e5",
                                        borderRadius: "0.25rem",
                                    }}
                                >
                                <div className="btn-search">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </div>
                                </span>
                            </div>
                            <div className="schools">
                                <a href={ucb}>
                               <img src={ucblogo} alt="buc-logo" />
                            
                                </a>
                                <a href={uscedu}>
                                    <img src={uscedulogo} alt="usc-logo" />
                                </a>
                                <a href={pu}>
                                    <img src={pulogo} alt="pu-logo" />
                                </a>
                                <a href={mit}>
                                    <img src={mitlogo} alt="mit-logo" />
                                </a>
                                <a href={yale}>
                                    <img src={yalelogo} alt="yale-logo" />
                                </a>
                            </div>
                        </>
    );
};

export default SearchBar;
