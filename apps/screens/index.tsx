import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screens from '@/commons/screens';
import Home from './Home';
import SignIn from './SignIn';
import Splash from './Splash';
import Welcome from './Welcome';
import { AuthProvider } from '@/context/AuthContext';

const Stack = createNativeStackNavigator();

/* Applying React.Context */
function WrapSplash (props: any) {
  return (
    <AuthProvider>
      <Splash {...props} />
    </AuthProvider>
  )
}
/* End - Applying React.Context */

export default function MainScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={screens.SPLASH}
      >
        <Stack.Screen name={screens.SPLASH} component={WrapSplash} />
        <Stack.Screen name={screens.WELCOME} component={Welcome} options={{ gestureEnabled: false }} />
        <Stack.Screen name={screens.SIGNIN} component={SignIn} />
        <Stack.Screen name={screens.HOME} component={Home} options={{ gestureEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}