/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, TouchableOpacity, Image, ImageSourcePropType} from 'react-native';

import {Keyboard} from 'react-native';
import {Colors, dynamicSize} from '@/src/config';
import CustomIcon from '@/src/components/CustomIcon';

const Tab = createBottomTabNavigator();

export type tabsType = {
  image?: string;
  name: string;
  label: string;
  icon?: ImageSourcePropType;
  component: Function;
  options?: any;
};
type Props = {
  tabs: tabsType[];
};

export function CustomTabs({tabs}: Props) {
  const defaultSize = 24;

  const [keyboardVisible, setKeyboardVisible] = React.useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // botão customizado para toda aba (mantém efeito de toque)
  const TabBarButton = (props: any) => (
    <TouchableOpacity
      {...props}
      activeOpacity={0.5}
      style={[
        props.style,
        {flex: 1, justifyContent: 'center', alignItems: 'center'},
      ]}
    />
  );

  return (
    <Tab.Navigator
      screenOptions={{
        animation: 'fade',
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.purple, // cor do ícone/texto ativo
        tabBarInactiveTintColor: Colors.gray200, // cor dos inativos
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: dynamicSize(55),
          backgroundColor: Colors.white,
          borderTopWidth: 0,
          borderTopLeftRadius: dynamicSize(20),
          borderTopRightRadius: dynamicSize(20),
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: -2},
          shadowOpacity: 0.1,
          shadowRadius: 5,
          paddingBottom: dynamicSize(10),
          display: keyboardVisible ? 'none' : 'flex',
        },
        tabBarLabelStyle: {
          fontSize: dynamicSize(12),
          fontFamily: 'Poppins-Regular',
          marginTop: dynamicSize(4),
        },
      }}>
      {tabs.map(item => {
        return (
          <Tab.Screen
            key={item.name}
            name={item.name}
            component={item.component as any}
            options={{
              tabBarLabel: item.label,

              tabBarLabelStyle: {
                fontSize: dynamicSize(12),
                fontFamily: 'Poppins-Regular',
                width: dynamicSize(90),
              },
              tabBarIcon: ({color}) => {
                return (
                  <CustomIcon
                    iconSource={item.icon!}
                    size={defaultSize}
                    color={color}
                  />
                );
              },
              tabBarIconStyle: {
                marginBottom: dynamicSize(2),
                marginTop: dynamicSize(10),
              },

              tabBarButton: props => <TabBarButton {...props} />,
              ...item.options,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
