import React from 'react';

const Search = ({ query, onChange, children, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={query}
        onChange={e => onChange(e.target.value)}
      />
      <button type="submit">{children}</button>
    </form>
  );
};

export default Search;
