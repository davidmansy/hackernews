import React from 'react';

const Search = ({ query, onSearchChange, children }) => {
  return (
    <form>
      {children}
      <input
        type="text"
        value={query}
        onChange={e => onSearchChange(e.target.value)}
      />
    </form>
  );
};

export default Search;
