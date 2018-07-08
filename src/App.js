import React, { Component } from 'react';
import Search from './components/Search';
import Table from './components/Table';
import Button from './components/Button';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = 100;

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      query: DEFAULT_QUERY,
      error: null
    };
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    const oldHits =
      results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  fetchSearchTopStories(query, page = 0) {
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${query}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => this.setState({ error: e }));
  }

  componentDidMount() {
    const { query } = this.state;
    this.setState({ searchKey: query });
    this.fetchSearchTopStories(query);
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
    const { query, results, searchKey, error } = this.state;
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
            <Table list={list} onDismiss={this.onDismiss} />
            <div className="interactions">
              <Button
                onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
              >
                More
              </Button>
            </div>{' '}
          </div>
        )}
      </div>
    );
  }
}

export default App;
