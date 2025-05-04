import {PropsScreen} from '@/src/types/Navigation';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useIndex} from './useIndex';
import {Colors, dynamicSize} from '@/src/config';
import {CustomScreenContainer} from '@/src/components/CustomScreenContainer';
import {CustomHeader} from '@/src/components/CustomHeader';
import {CustomText} from '@/src/components/CustomText';
import {CustomInput} from '@/src/components/CustomInput';
import {CustomButton} from '@/src/components/CustomButton';
import {CustomAlert} from '@/src/components/Alert';

export const ConfirmEmail = ({navigation, route}: PropsScreen) => {
    const {
        codigo,
        setCodigo,
        loading,
        handleConfirmEmail,
        alert,
        setAlert,
        handleResendEmail,
    } = useIndex({
        navigation,
        route,
    });

    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
        },
        titleText: {
            fontSize: dynamicSize(24),
            fontFamily: 'Poppins-Bold',
            fontWeight: '400',
            textAlign: 'left',
            marginBottom: dynamicSize(10),
        },
        subTitleText: {
            fontSize: dynamicSize(14),
            textAlign: 'left',
            color: Colors.gray200,
            fontFamily: 'Poppins-Medium',
            marginBottom: dynamicSize(10),
        },
    });

    return (
        <CustomScreenContainer>
            <ScrollView>
                <CustomHeader text="Confirmação de e-mail" />
                <View style={styles.container}>
                    <CustomText style={styles.titleText}>
                        {'Vamos ativar sua conta'}
                    </CustomText>
                    <CustomText style={styles.subTitleText}>
                        {'Digite o código enviado para seu e-mail'}
                    </CustomText>
                </View>
                <CustomInput
                    keyboardType="default"
                    title={'Código'}
                    keyName="codigo"
                    value={[codigo, setCodigo]}
                    icon="user"
                    max={10}
                />
                <CustomButton
                    title={'Enviar'}
                    isLoading={loading}
                    onPress={handleConfirmEmail}
                    alignItems="flex-end"
                    mv={20}
                />

                <View style={{alignItems: 'center', marginTop: 20}}>
                    <Text
                        style={{
                            fontSize: dynamicSize(16),
                            fontFamily: 'Poppins-Regular',
                            color: Colors.black,
                        }}>
                        Ainda não recebeu o e-mail?
                    </Text>
                    <Text
                        style={{
                            fontSize: dynamicSize(16),
                            color: Colors.purple,
                            fontFamily: 'Poppins-Regular',
                        }}
                        onPress={handleResendEmail}>
                        Reenviar código
                    </Text>
                </View>
            </ScrollView>
            <CustomAlert alert={alert} setAlert={setAlert} />
        </CustomScreenContainer>
    );
};
