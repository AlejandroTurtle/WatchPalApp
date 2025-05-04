import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Event} from '@/types/Event';
import {Colors, dynamicSize} from '@/src/config';

export const CustomBanners = ({
  title,
  banners,
  onPress,
}: {
  title: string;
  banners: Event[];
  onPress?: (event: Event) => void;
}) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={banners}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.containerBanners}
            onPress={() => onPress?.(item)}>
            <Image source={item.image} style={styles.banners} />
            <Text style={styles.titleEvent}>{item.title}</Text>
            <Text style={styles.eventDescription}>{item.description}</Text>
            <Text style={styles.eventDate}>{item.date}</Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: dynamicSize(16),
    color: Colors.black,
    fontFamily: 'Poppins-Bold',
    marginBottom: dynamicSize(5),
    textAlign: 'left',
    // marginLeft: dynamicSize(15),
  },
  banners: {
    width: dynamicSize(200),
    height: dynamicSize(100),
    borderRadius: dynamicSize(10),
  },
  containerBanners: {
    width: dynamicSize(200),

    borderRadius: dynamicSize(10),
    backgroundColor: Colors.white,
    marginHorizontal: dynamicSize(10),
  },
  titleEvent: {
    fontSize: dynamicSize(16),
    color: Colors.black,
    fontFamily: 'Poppins-Bold',

    textAlign: 'center',
    marginTop: dynamicSize(10),
  },
  eventDescription: {
    fontSize: dynamicSize(12),
    color: Colors.black,
    fontFamily: 'Poppins-Medium',
    marginBottom: dynamicSize(5),
    textAlign: 'left',
    // marginLeft: dynamicSize(10),
  },
  eventDate: {
    fontSize: dynamicSize(11.2),
    color: Colors.purple,
    fontFamily: 'Poppins-Medium',
    marginBottom: dynamicSize(5),
    textAlign: 'left',
    // marginLeft: dynamicSize(10),
  },
});
