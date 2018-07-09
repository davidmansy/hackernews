import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './';

function createNodeMock(element) {
  if (element.type === 'input') {
    return {
      focus() {}
    };
  }
  return null;
}

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('snapshot', () => {
    const options = { createNodeMock };
    const component = renderer.create(<App />, options);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
