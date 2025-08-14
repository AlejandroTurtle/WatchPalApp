import React from 'react';
import {PropsScreen} from '@/src/types/Navigation';
import {CustomScreenContainer} from '@/src/components/CustomScreenContainer';
import {useIndex} from './useIndex';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import avatar from '@/assets/avatar.png';
import {Colors} from '@/src/config';
import {CustomInfoCard} from '@/src/components/CustomInfoCard';
import Icon from 'react-native-vector-icons/Feather';
import {ActivityIndicator} from 'react-native-paper';

export const Profile = ({navigation, route}: PropsScreen) => {
  const {profile, loading, seriesState} = useIndex({
    navigation,
    route,
  });

  const handleSettingsPress = () => {
    navigation.navigate('Adjustments');
  };

  return (
    <CustomScreenContainer>
      <View style={styles.containerProfile}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={handleSettingsPress}>
            <Icon name="settings" size={25} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <Image
          style={styles.avatar}
          source={profile?.foto ? {uri: profile?.foto} : avatar}
          onError={e => console.warn('Erro ao carregar foto:', e.nativeEvent)}
        />
        <View style={styles.containerText}>
          <Text style={styles.profileName}>{profile?.nome}</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 16, marginTop: 20}}>
          <CustomInfoCard
            iconName="film"
            value={seriesState.seriesCompleted}
            label="Séries concluídas"
            loading={loading}
          />
          <CustomInfoCard
            iconName="airplay"
            value={seriesState.episodesWatched}
            label="Episódios assistidos"
            loading={loading}
          />
          <CustomInfoCard
            iconName="clock"
            value={seriesState.hoursWatched.toFixed(2)}
            label="Horas assistidas"
            loading={loading}
          />
        </View>
      </View>
    </CustomScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    alignItems: 'flex-end',
  },
  settingsButton: {
    backgroundColor: Colors.blue,
    borderRadius: 10,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  containerProfile: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 2,
  },
  avatar: {
    marginTop: 12,
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  profileName: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.white,
  },
  containerText: {
    marginTop: 12,
  },
});
