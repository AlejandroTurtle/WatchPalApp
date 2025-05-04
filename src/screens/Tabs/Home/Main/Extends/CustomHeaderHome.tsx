import {Colors, dynamicSize} from '@/src/config';
import {profileContext} from '@/src/context/profileContext';
import {useNavigation} from '@react-navigation/native';

import React, {useEffect} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import logo from '@/src/assets/logo.png';
import fotoPerfil from '@/assets/download1.png';

export const CustomHeaderHome = () => {
  const {profile, loadProfile} = profileContext();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadProfile();
    });
    loadProfile();
    return unsubscribe;
  }, [navigation]);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: dynamicSize(10),
    },
    leftSide: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: dynamicSize(50),
      height: dynamicSize(50),
      borderRadius: dynamicSize(20),
      marginRight: dynamicSize(12),
    },
    textWelcome: {
      fontSize: dynamicSize(14),
      color: Colors.gray200,
      fontFamily: 'Poppins-Regular',
    },
    textName: {
      fontSize: dynamicSize(18),
      color: Colors.black,
      fontFamily: 'Poppins-SemiBold',
    },
    imageLogo: {
      width: dynamicSize(70),
      height: dynamicSize(70),
      resizeMode: 'contain',
    },
  });

  return (
    <>
      {!profile ? (
        <ActivityIndicator
          size="large"
          color={Colors.purple}
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        />
      ) : (
        <View style={styles.container}>
          <View style={styles.leftSide}>
            <Image
              style={styles.avatar}
              source={{uri: profile?.foto}}
              onError={e =>
                console.warn('Erro ao carregar foto:', e.nativeEvent)
              }
            />
            <View>
              <Text style={styles.textWelcome}>Bem-vindo novamente,</Text>
              <Text style={styles.textName}>{profile?.apelido}</Text>
            </View>
          </View>
          <Image style={styles.imageLogo} source={logo} />
        </View>
      )}
    </>
  );
};
