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

type Props = {
  events: Event[];
  onPress?: (event: Event) => void;
};

export const CustomScrollEvents = ({events, onPress}: Props) => {
  const renderItem = ({item}: {item: Event}) => {
    // transforma "Quinta-feira - 22/05/2025" em "Quinta-feira, 22/05/2025"
    const dateFormatted = item.date.replace(' - ', ', ');
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => onPress?.(item)}
        activeOpacity={0.8}>
        <Image source={item.image} style={styles.cardImage} />

        <View style={styles.cardContent}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>

          <Text style={styles.subtitle} numberOfLines={1}>
            {item.location}
          </Text>

          <Text style={styles.date}>
            {dateFormatted} — {item.hour}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={events}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    // paddingHorizontal: dynamicSize(16),
    // paddingVertical: dynamicSize(8),
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: dynamicSize(12),
    marginVertical: dynamicSize(8),
    overflow: 'hidden',
    // shadow iOS
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: dynamicSize(6),
    shadowOffset: {width: 0, height: dynamicSize(3)},
    // elevation Android
    elevation: 3,
  },
  cardImage: {
    width: dynamicSize(90),
    height: dynamicSize(90),
    borderTopLeftRadius: dynamicSize(12),
    borderBottomLeftRadius: dynamicSize(12),
  },
  cardContent: {
    flex: 1,
    padding: dynamicSize(10),
    justifyContent: 'space-between',
  },
  title: {
    fontSize: dynamicSize(16),
    fontFamily: 'Poppins-SemiBold',
    color: Colors.black,
  },
  subtitle: {
    fontSize: dynamicSize(12),
    fontFamily: 'Poppins-Regular',
    color: Colors.gray200,
    marginTop: dynamicSize(4),
  },
  date: {
    fontSize: dynamicSize(12),
    fontFamily: 'Poppins-Medium',
    color: Colors.purple,
    marginTop: dynamicSize(6),
  },
});
