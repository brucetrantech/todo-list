/**
 * @format
 */

import 'react-native';
import React from 'react';
import SignIn from '@/screens/SignIn';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('[Snapshot] SignIn screen renders correctly', () => {
  const navigation = {
    navigate: jest.fn(),
  }
  const tree = renderer.create(<SignIn navigation={navigation} />).toJSON();
  expect(tree).toMatchSnapshot();
});
