import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgProps, SvgUri} from 'react-native-svg';
import {Colors, dynamicSize} from '@/src/config';
import {EventsType} from '@/src/screens/Tabs/Home/Main/useIndex';

type Props = {
  item: EventsType[];
  onPress?: (eventName: string) => void;
};

export const CustomEventCard = ({item, onPress}: Props) => {
  console.log('cardEvents: ', JSON.stringify(item, null, 2));

  return (
    <FlatList
      data={item || []}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={eventItem => String(eventItem.id)}
      renderItem={({item: eventItem}) => (
        <TouchableOpacity onPress={() => onPress?.(eventItem.nome)}>
          <View style={styles.containerCard}>
            <SvgUri
              width={dynamicSize(30)}
              height={dynamicSize(30)}
              uri={eventItem.imagem}
            />
            <Text style={styles.text}>{eventItem.nome}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  containerCard: {
    width: dynamicSize(120),
    height: dynamicSize(100),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Colors.purple,
  },
  text: {
    fontSize: dynamicSize(11),
    color: Colors.black,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});
