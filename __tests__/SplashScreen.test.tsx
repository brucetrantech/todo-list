/**
 * @format
 */

import 'react-native';
import React from 'react';
import Splash from '@/screens/Splash';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('[Snapshot] Splash screen renders correctly', () => {
  const navigation = {
    navigate: jest.fn(),
  }
  const tree = renderer.create(<Splash navigation={navigation} />).toJSON();
  expect(tree).toMatchSnapshot();
});
