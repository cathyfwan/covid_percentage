import React from "react";

const Search = ({ onChange, value, clear }) => (
  <div className="searchForm">
    <input
      className="searchBox"
      placeholder="Search a country.."
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
    <button data-testid="clearBtn" className="clear" onClick={clear}>
      <i className="fa fa-refresh" />
      <span>Clear</span>
    </button>
  </div>
);

export default Search;
