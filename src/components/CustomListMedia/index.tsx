import {Colors, dynamicSize} from '@/src/config';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export type Filme = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  title?: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
};

type PropsCustomListMedia = {
  media: Filme[];
  onPress?: (filme: Filme) => void;
};

export const CustomListMedia = ({media, onPress}: PropsCustomListMedia) => {
  const [filteredMedia, setFilteredMedia] = useState<Filme[]>([]);

  useEffect(() => {
    setFilteredMedia(media);
  }, [media]);

  const handleImageError = (id: number) => {
    setFilteredMedia(prev => prev.filter(item => item.id !== id));
  };

  const styles = StyleSheet.create({
    row: {
      justifyContent: 'space-between',
      marginHorizontal: dynamicSize(8),
    },
    container: {
      flex: 1,
      alignItems: 'center',
      marginVertical: dynamicSize(8),
    },
    image: {
      width: dynamicSize(151),
      height: dynamicSize(200),
      borderRadius: dynamicSize(24),
    },
    title: {
      marginTop: dynamicSize(4),
      fontSize: dynamicSize(14),
      fontFamily: 'Poppins-SemiBold',
      color: Colors.white,
      textAlign: 'center',
    },
  });

  return (
    <FlatList
      data={filteredMedia}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      contentContainerStyle={{paddingBottom: dynamicSize(80)}}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.row}
      renderItem={({item}) => {
        const uri = `https://image.tmdb.org/t/p/w500${item.poster_path ?? ''}`;
        return (
          <TouchableOpacity
            onPress={() => onPress?.(item)}
            style={styles.container}>
            <Image
              source={{uri}}
              style={styles.image}
              resizeMode="cover"
              onError={({nativeEvent}) => {
                handleImageError(item.id);
                console.warn('Falha ao carregar:', uri, nativeEvent);
              }}
            />
            <Text style={styles.title}>{item.name ?? item.title}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};
