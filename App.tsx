import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {
  NavigationContainer,
  DefaultTheme,
  Theme,
} from '@react-navigation/native';

import {Start} from './src/screens/Start';
import {AuthStack} from './src/screens/Auth/AuthStack';
import {Tabs} from './src/screens/Tabs/TabsStack';

import {CustomScreens} from './src/components/CustomScreens';
import {AppProfileContext} from './src/context/profileContext';
import {screenType} from './src/types/Navigation';
import {Colors} from './src/config';

const screens: screenType[] = [
  {name: 'Start', component: Start},
  {name: 'AuthStack', component: AuthStack},
  {name: 'Tabs', component: Tabs},
];

// Custom theme for React Navigation
const AppTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
    text: Colors.black,
    primary: Colors.white,
  },
};

const App: React.FC = () => (
  <SafeAreaProvider>
    <StatusBar
      barStyle="light-content"
      backgroundColor={Colors.black}
      translucent={false}
    />
    <SafeAreaView style={styles.container}>
      <AppProfileContext>
        <NavigationContainer theme={AppTheme}>
          <CustomScreens screens={screens} />
        </NavigationContainer>
      </AppProfileContext>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default App;
