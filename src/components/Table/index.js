import React, { Component } from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';
import { SORTS } from '../../constants';
import Sort from '../Sort';

const largeColumn = {
  width: '40%'
};

const midColumn = {
  width: '30%'
};

const smallColumn = {
  width: '10%'
};

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortKey: 'NONE',
      isSortReversed: false
    };
  }

  onSort = sortKey => {
    const isSortReversed =
      this.state.sortKey === sortKey && !this.state.isSortReversed;
    this.setState({ sortKey, isSortReversed });
  };

  render() {
    const { list, onDismiss } = this.props;
    const { sortKey, isSortReversed } = this.state;
    const sortedList = isSortReversed
      ? SORTS[sortKey](list).reverse()
      : SORTS[sortKey](list);
    return (
      <div className="table">
        <div className="table-header">
          <span style={largeColumn}>
            <Sort
              sortKey={'TITLE'}
              onSort={() => this.onSort(sortKey)}
              activeSortKey={sortKey}
            >
              Title
            </Sort>
          </span>
          <span style={midColumn}>
            <Sort
              sortKey={'AUTHOR'}
              onSort={() => this.onSort(sortKey)}
              activeSortKey={sortKey}
            >
              Author
            </Sort>
          </span>
          <span style={smallColumn}>
            <Sort
              sortKey={'COMMENTS'}
              onSort={() => this.onSort(sortKey)}
              activeSortKey={sortKey}
            >
              Comments
            </Sort>
          </span>
          <span style={smallColumn}>
            <Sort
              sortKey={'POINTS'}
              onSort={() => this.onSort(sortKey)}
              activeSortKey={sortKey}
            >
              Points
            </Sort>
          </span>
          <span style={smallColumn}>Archive</span>
        </div>
        {sortedList.map(item => (
          <div key={item.objectID} className="table-row">
            <span style={largeColumn}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={midColumn}>{item.author}</span>
            <span style={smallColumn}>{item.num_comments}</span>
            <span style={smallColumn}>{item.points}</span>
            <span style={smallColumn}>
              <Button
                onClick={() => {
                  onDismiss(item.objectID);
                }}
                className="button-inline"
              >
                Dismiss
              </Button>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default Table;
