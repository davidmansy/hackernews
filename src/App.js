import React, { Component } from 'react';
import Search from './components/Search';
import Table from './components/Table';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      query: ''
    };
  }

  onDismiss = id => {
    this.setState(currentState => {
      currentState.list = currentState.list.filter(
        item => item.objectID !== id
      );
      return currentState;
    });
  };

  onSearchChange = query => {
    this.setState(currentState => {
      currentState.query = query;
      return currentState;
    });
  };

  render() {
    const { query, list } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search query={query} onSearchChange={this.onSearchChange}>
            Search
          </Search>
          <Table list={list} query={query} onDismiss={this.onDismiss} />
        </div>
      </div>
    );
  }
}

export default App;
