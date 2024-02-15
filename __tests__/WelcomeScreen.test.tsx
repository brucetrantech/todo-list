import React from 'react';
import renderer from 'react-test-renderer';
import Welcome from '@/screens/Welcome';

test('renders snapshot correctly', () => {
  const tree = renderer.create(<Welcome navigation={null} />).toJSON();
  expect(tree).toMatchSnapshot();
});