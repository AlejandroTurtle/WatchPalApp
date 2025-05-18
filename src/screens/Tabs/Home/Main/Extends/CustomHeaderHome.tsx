import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import {Colors, dynamicSize} from '@/src/config';
import {profileContext} from '@/src/context/profileContext';

import avatar from '@/assets/avatar.png';

export const CustomHeaderHome = ({onPress}: {onPress: () => void}) => {
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
      paddingHorizontal: dynamicSize(16),
    },
    leftSide: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: dynamicSize(50),
      height: dynamicSize(50),
      borderRadius: dynamicSize(25),
      marginRight: dynamicSize(12),
    },
    textWelcome: {
      fontSize: dynamicSize(14),
      color: Colors.gray,
      fontFamily: 'Poppins-Regular',
    },
    textName: {
      fontSize: dynamicSize(18),
      color: Colors.white,
      fontFamily: 'Poppins-SemiBold',
    },
    searchIcon: {
      // se quiser adicionar espaçamento adicional na direita:
      // marginRight: dynamicSize(8),
    },
  });

  if (!profile) {
    return (
      <ActivityIndicator
        size="large"
        color={Colors.purple}
        style={{
          marginTop: dynamicSize(10),
          alignSelf: 'flex-start',
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Avatar + textos */}
      <View style={styles.leftSide}>
        <Image
          style={styles.avatar}
          source={profile.foto ? {uri: profile.foto} : avatar}
          onError={e => console.warn('Erro ao carregar foto:', e.nativeEvent)}
        />
        <View>
          <Text style={styles.textWelcome}>Bem-vindo novamente,</Text>
          <Text style={styles.textName}>{profile.nome}</Text>
        </View>
      </View>

      <Feather
        name="search"
        size={24}
        color={Colors.white}
        style={styles.searchIcon}
        onPress={onPress}
      />
    </View>
  );
};
