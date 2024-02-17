// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// Mocking @react-native-async-storage/async-storage
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('@react-navigation/native', () => '@react-navigation/native');

jest.mock('react-redux', () => {
    const mockReactRedux = require('react-native/jest/mockComponent');
    return {
        ...mockReactRedux,
        Provider: jest.fn(() => null),
        useDispatch: jest.fn(),
        useSelector: jest.fn(() => null, () => null), 
    }
});

// Mocking @react-navigation/native-stack
jest.mock('@react-navigation/native-stack', () => {
    const mockNativeStack = require('react-native/jest/mockComponent');
    return {
        ...mockNativeStack,
        createNativeStackNavigator: jest.fn(() => ({
            Navigator: jest.fn(() => null),
            Screen: jest.fn(() => null),
        }))
    };
});
