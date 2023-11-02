import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Main from './screens/Main';
import ScreenAdvanced from './screens/ScreenAdvanced';

import { MaterialIcons } from '@expo/vector-icons';
import NavBar from './components/navbar';

import { createStore } from 'redux';
import reducer from './reducer';
import { Provider } from 'react-redux';

const store = createStore(reducer);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>

    <NavigationContainer>
       <StatusBar backgroundColor="#1c1c1c" barStyle="light-content" translucent={true} style="light" />
   <NavBar />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown:false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Tab1') {
              iconName = 'home';
            } else if (route.name === 'Tab2') {
              iconName = 'dvr';
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },

          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
          tabBarActiveBackgroundColor:'rgba(144, 240, 100, 0.5)',
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
        
          tabBarStyle: {
            backgroundColor: '#1c1c1c',
            borderTopWidth: 0,
    
          },

   
        }
      
        )}

      >
        <Tab.Screen name="Tab1" component={Main} options={{ title: 'Main' }} />
        <Tab.Screen name="Tab2" component={ScreenAdvanced} options={{ title: 'Advanced' }} />
      </Tab.Navigator>
    </NavigationContainer>

  </Provider>
  );
}
