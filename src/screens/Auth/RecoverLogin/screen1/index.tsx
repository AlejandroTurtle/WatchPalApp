/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from '../styles';
import {useIndex} from './useIndex';
import {CustomScreenContainer} from '@/src/components/CustomScreenContainer';
import {CustomHeader} from '@/src/components/CustomHeader';
import {CustomText} from '@/src/components/CustomText';
import {CustomInput} from '@/src/components/CustomInput';
import {PropsScreen} from '@/src/types/Navigation';
import {CustomButton} from '@/src/components/CustomButton';
import {dynamicSize} from '@/src/config';
import TextNavigation from '@/src/components/TextNavigation';
import {CustomAlert} from '@/src/components/Alert';

export const RecoverLogin1 = ({navigation, route}: PropsScreen) => {
    const {user, setUser, isLoading, alert, setAlert, nextScreen, texts} =
        useIndex({
            navigation,
            route,
        });
    return (
        <CustomScreenContainer>
            <CustomHeader text="" />
            <ScrollView
                style={{width: '100%'}}
                contentContainerStyle={{
                    flexGrow: 1,
                }}>
                <View style={styles.container}>
                    <CustomText style={styles.titleText}>
                        {texts.title}
                    </CustomText>
                    <CustomText style={styles.subTitleText}>
                        {texts.subtitle}
                    </CustomText>
                </View>
                <CustomInput
                    title={texts.inputemail}
                    keyName="email"
                    value={[user, setUser]}
                    icon="mail"
                    keyboardType="email-address"
                />
                <CustomButton
                    title={texts.button}
                    isLoading={isLoading}
                    onPress={nextScreen}
                    alignItems="flex-end"
                    mv={dynamicSize(30)}
                />
                <TextNavigation
                    text1="Você lembrou a senha?"
                    text2="Login"
                    onPress={() => navigation.navigate('Login')}
                />
            </ScrollView>
            <CustomAlert alert={alert} setAlert={setAlert} />
        </CustomScreenContainer>
    );
};
