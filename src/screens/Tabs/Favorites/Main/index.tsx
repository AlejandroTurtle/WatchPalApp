import {PropsScreen} from '@/src/types/Navigation';
import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useIndex} from './useIndex';
import {CustomScreenContainer} from '@/src/components/CustomScreenContainer';
import {CustomHeader} from '@/src/components/CustomHeader';
import {Colors} from '@/src/config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const Favorites = ({navigation, route}: PropsScreen) => {
  const {favorites, IMG_BASE, unfavorite, goToDetails, loading} = useIndex({
    navigation,
    route,
  });

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={Colors.blue} />
        <Text style={{marginTop: 10, color: Colors.gray100}}>
          Carregando favoritos...
        </Text>
      </View>
    );
  }

  const renderItem = ({item}: {item: any}) => {
    const titulo = item.title ?? item.name;
    const data = item.release_date ?? item.first_air_date ?? '';
    const ano = data ? `(${data.slice(0, 4)})` : '';

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => goToDetails(item)}>
        <Image
          source={{uri: `${IMG_BASE}${item.poster_path}`}}
          style={styles.poster}
          resizeMode="cover"
        />

        <View style={styles.info}>
          <Text style={styles.title}>
            {titulo} <Text style={styles.year}>{ano}</Text>
          </Text>

          <View style={styles.tagsContainer}>
            {item.genres.map((genre: any) => (
              <View key={genre.id} style={styles.tag}>
                <Text style={styles.tagText}>{genre.name}</Text>
              </View>
            ))}
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>
              {item.vote_average.toFixed(1).replace('.', ',')}
            </Text>
            <FontAwesome name="star" size={14} style={styles.starIcon} />
            <Text style={styles.voteCount}>({item.vote_count})</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => unfavorite(item.id)}>
          <FontAwesome name="heart" size={24} color="#E62429" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <CustomHeader text="Favoritos" noBack />

      <FlatList
        data={favorites}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum favorito encontrado.</Text>
          </View>
        }
        contentContainerStyle={
          favorites.length === 0 ? {flex: 1} : {paddingBottom: 120}
        }
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'flex-start',
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 6,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
  year: {
    fontWeight: 'normal',
    color: Colors.white,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  tag: {
    borderWidth: 1,
    borderColor: '#AAA',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: Colors.gray100,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 4,
    color: Colors.white,
  },
  starIcon: {
    marginRight: 4,
    color: '#F5A623',
  },
  voteCount: {
    fontSize: 12,
    color: Colors.gray100,
  },
  heartButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
