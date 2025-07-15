import {PropsScreen} from '@/src/types/Navigation';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useIndex} from './useIndex';
import {CustomScreenContainer} from '@/src/components/CustomScreenContainer';
import {CustomHeader} from '@/src/components/CustomHeader';
import {Colors, dynamicSize} from '@/src/config';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CustomAlert} from '@/src/components/Alert';

export const Details = ({navigation, route}: PropsScreen) => {
  const {
    data,
    addFavorite,
    alert,
    setAlert,
    favorite,
    removeFavorite,
    loading,
  } = useIndex({
    navigation,
    route,
  });

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }

  return (
    <CustomScreenContainer>
      <CustomHeader text="" />
      <ScrollView
        contentContainerStyle={{paddingBottom: 120}}
        showsVerticalScrollIndicator={false}>
        {data && (
          <>
            <Text style={styles.title}>{data.original_title}</Text>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
              }}
              style={styles.poster}
            />
            <Text style={styles.secondTitle}>Sinopse</Text>
            <Text style={styles.sinopse}>{data.overview}</Text>
            <View style={styles.bottomRow}>
              <View style={styles.iconGroup}>
                <Feather name="star" size={30} color="#FFD700" />
                <Text style={styles.rating}>{data.vote_average}</Text>
              </View>
              <View style={styles.iconGroup}>
                <TouchableOpacity
                  onPress={favorite ? removeFavorite : addFavorite}>
                  <FontAwesome
                    name={favorite ? 'heart' : 'heart-o'}
                    size={30}
                    color={Colors.red}
                  />
                </TouchableOpacity>
                <Text style={styles.rating}>Favoritar</Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
      <CustomAlert alert={alert} setAlert={setAlert} />
    </CustomScreenContainer>
  );
};

const styles = StyleSheet.create({
  poster: {
    width: dynamicSize(250),
    height: dynamicSize(345),
    borderRadius: dynamicSize(24),
    alignSelf: 'center',
    resizeMode: 'cover',
    marginTop: dynamicSize(10),
  },
  title: {
    fontSize: dynamicSize(24),
    textAlign: 'center',
    color: Colors.white,
    fontFamily: 'Poppins-Bold',
  },
  secondTitle: {
    fontSize: dynamicSize(14),
    textAlign: 'left',
    color: Colors.blue,
    fontFamily: 'Poppins-Medium',
    marginTop: dynamicSize(20),
  },
  sinopse: {
    fontSize: dynamicSize(14),
    textAlign: 'left',
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
    marginTop: dynamicSize(10),
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: dynamicSize(20),
    paddingHorizontal: dynamicSize(20),
  },

  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rating: {
    fontSize: dynamicSize(20),
    color: Colors.white,
    fontFamily: 'Poppins-Medium',
    marginLeft: dynamicSize(10),
  },
});
