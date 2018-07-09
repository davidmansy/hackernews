import React, { Component } from 'react';

class Search extends Component {
  componentDidMount() {
    this.input.focus();
  }

  render() {
    const { query, onChange, children, onSubmit } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={query}
          onChange={e => onChange(e.target.value)}
          ref={node => (this.input = node)}
        />
        <button type="submit">{children}</button>
      </form>
    );
  }
}

export default Search;
