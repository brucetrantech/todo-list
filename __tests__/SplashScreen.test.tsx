import React from 'react';
import renderer from 'react-test-renderer';
import Splash from '@/screens/Splash';

test('renders snapshot correctly', () => {
  const tree = renderer.create(<Splash navigation={null} />).toJSON();
  expect(tree).toMatchSnapshot();
});