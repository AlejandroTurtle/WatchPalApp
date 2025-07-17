import React, {useEffect} from 'react';
import {Platform, StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
  Theme as NavigationTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefault,
  MD3DarkTheme as PaperDark,
  MD3Theme,
} from 'react-native-paper';

import {Start} from './src/screens/Start';
import {AuthStack} from './src/screens/Auth/AuthStack';
import {Tabs} from './src/screens/Tabs/TabsStack';
import {CustomScreens} from './src/components/CustomScreens';
import {AppProfileContext} from './src/context/profileContext';

import {screenType} from './src/types/Navigation';
import {DarkColors, LightColors} from './src/config';

const screens: screenType[] = [
  {name: 'Start', component: Start},
  {name: 'AuthStack', component: AuthStack},
  {name: 'Tabs', component: Tabs},
];

const App: React.FC = () => {
  const scheme = useColorScheme();

  const appColors = scheme === 'dark' ? DarkColors : LightColors;

  const navigationTheme: NavigationTheme = {
    ...(scheme === 'dark' ? NavigationDarkTheme : NavigationDefaultTheme),
    colors: {
      ...(scheme === 'dark'
        ? NavigationDarkTheme.colors
        : NavigationDefaultTheme.colors),
      background: appColors.background,
      text: appColors.black,
    },
  };

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={appColors.background}
      />
      <SafeAreaView
        style={[styles.container, {backgroundColor: appColors.background}]}>
        <AppProfileContext>
          <NavigationContainer theme={navigationTheme}>
            <PaperProvider>
              <CustomScreens screens={screens} />
            </PaperProvider>
          </NavigationContainer>
        </AppProfileContext>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
