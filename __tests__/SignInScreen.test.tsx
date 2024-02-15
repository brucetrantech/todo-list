import React from 'react';
import renderer from 'react-test-renderer';
import SignIn from '@/screens/SignIn';

test('renders snapshot correctly', () => {
  const tree = renderer.create(<SignIn navigation={null} />).toJSON();
  expect(tree).toMatchSnapshot();
});