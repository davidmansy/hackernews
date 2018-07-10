import React, { Component } from 'react';
import Search from '../Search';
import Table from '../Table';
import './index.css';
import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP
} from '../../constants';
import fetch from 'isomorphic-fetch';
import ButtonWithLoading from '../ButtonWithLoading';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      query: DEFAULT_QUERY,
      error: null,
      isLoading: false,
      sortKey: 'NONE',
      isSortReversed: false
    };
  }

  onSort = sortKey => {
    const isSortReversed =
      this.state.sortKey === sortKey && !this.state.isSortReversed;
    this.setState({ sortKey, isSortReversed });
  };

  setSearchTopStories(result) {
    if (this._isMounted) {
      const { hits, page } = result;
      const { searchKey, results } = this.state;
      const oldHits =
        results && results[searchKey] ? results[searchKey].hits : [];
      const updatedHits = [...oldHits, ...hits];
      this.setState({
        results: {
          ...results,
          [searchKey]: { hits: updatedHits, page }
        },
        isLoading: false
      });
    }
  }

  fetchSearchTopStories(query, page = 0) {
    this.setState({ isLoading: true });
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${query}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => this.setState({ error: e }));
  }

  componentDidMount() {
    this._isMounted = true;
    const { query } = this.state;
    this.setState({ searchKey: query });
    this.fetchSearchTopStories(query);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onDismiss = id => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({
      results: { ...results, [searchKey]: { hits: updatedHits, page } }
    });
  };

  onSearchChange = query => {
    this.setState(currentState => {
      currentState.query = query;
      return currentState;
    });
  };

  needsToSearchTopStories(query) {
    return !this.state.results[query];
  }

  onSearchSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    this.setState({ searchKey: query });
    if (this.needsToSearchTopStories(query)) {
      this.fetchSearchTopStories(query);
    }
  };

  render() {
    const {
      query,
      results,
      searchKey,
      error,
      isLoading,
      sortKey,
      isSortReversed
    } = this.state;
    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;
    const list =
      (results && results[searchKey] && results[searchKey].hits) || [];

    return (
      <div className="page">
        <div className="interactions">
          <Search
            query={query}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        {error ? (
          <div className="interactions">Something went wrong!</div>
        ) : (
          <div>
            <Table
              list={list}
              onDismiss={this.onDismiss}
              sortKey={sortKey}
              onSort={this.onSort}
              isSortReversed={isSortReversed}
            />
            <div className="interactions">
              <ButtonWithLoading
                onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
                isLoading={isLoading}
              >
                More
              </ButtonWithLoading>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
