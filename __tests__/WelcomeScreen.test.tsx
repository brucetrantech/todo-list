/**
 * @format
 */

import 'react-native';
import React from 'react';
import Welcome from '@/screens/Welcome';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('[Snapshot] Welcome screen renders correctly', () => {
  const tree = renderer.create(<Welcome navigation={null} />).toJSON();
  expect(tree).toMatchSnapshot();
});
