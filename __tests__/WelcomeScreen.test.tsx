import React from 'react';
import renderer from 'react-test-renderer';
import Welcome from '@/screens/Welcome';

test('r[Snapshot] Welcome screen renders correctly', () => {
  const tree = renderer.create(<Welcome navigation={null} />).toJSON();
  expect(tree).toMatchSnapshot();
});