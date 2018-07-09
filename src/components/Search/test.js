import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Search from './';

function createNodeMock(element) {
  if (element.type === 'input') {
    return {
      focus() {}
    };
  }
  return null;
}

describe('Search', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search>Search</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('snapshot', () => {
    const options = { createNodeMock };
    const component = renderer.create(<Search>Search</Search>, options);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
