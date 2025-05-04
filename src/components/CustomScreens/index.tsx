import React from 'react';
import {screenType} from '@/src/types/Navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

type props = {
    screens: screenType[];
};

export const CustomScreens = ({screens}: props) => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            {screens.map((screen, index) => (
                <Stack.Screen
                    key={index}
                    name={screen?.name}
                    component={screen?.component as any}
                    options={{
                        animation: 'fade',
                        headerShown: false,
                        ...screen?.options,
                    }}
                />
            ))}
        </Stack.Navigator>
    );
};
