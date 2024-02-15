import * as React from 'react';
import MainScreen from '@/screens';
import StoreProvider from '@/redux/StoreProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <StoreProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MainScreen />
      </GestureHandlerRootView>
    </StoreProvider>
  );
}