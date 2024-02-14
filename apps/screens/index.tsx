import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screens } from 'commons';
import Home from './Home';
import SignIn from './SignIn';
import Splash from './Splash';
import Welcome from './Welcome';

const Stack = createNativeStackNavigator();

export default function MainScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={screens.SPLASH}
      >
        <Stack.Screen name={screens.SPLASH} component={Splash} />
        <Stack.Screen name={screens.WELCOME} component={Welcome} />
        <Stack.Screen name={screens.SIGNIN} component={SignIn} />
        <Stack.Screen name={screens.HOME} component={Home} options={{ gestureEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}