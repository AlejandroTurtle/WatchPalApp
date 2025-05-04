import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Event} from '@/types/Event';
import {Image} from 'react-native';
import {dynamicSize} from '@/src/config';

export const CustomBannerEvents = ({
  events,
  onPress,
}: {
  events: Event[];
  onPress?: (event: Event) => void;
}) => {
  return (
    <FlatList
      data={events}
      renderItem={({item, index}) => (
        <TouchableOpacity key={index} onPress={() => onPress?.(item)}>
          <Image source={{uri: item.imagem}} style={styles.banners} />
        </TouchableOpacity>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  banners: {
    width: dynamicSize(200),
    height: dynamicSize(300),
    borderRadius: dynamicSize(10),
    // marginLeft: dynamicSize(15),
    marginHorizontal: dynamicSize(5),
  },
});
