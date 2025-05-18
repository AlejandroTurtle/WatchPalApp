import {Colors, dynamicSize} from '@/src/config';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Filme} from '@/src/types/Filmes';

type Props = {
  title: string;
  line?: boolean;
  cover?: Filme[];
  onPress: () => void;
};

type EmptyProps = {
  onPress: () => void;
};

const EmptyListComponent: React.FC<EmptyProps> = ({onPress}) => (
  <TouchableOpacity style={styles.emptyContainer} onPress={onPress}>
    <Text style={styles.emptyText}>
      Clique aqui para adicionar um filme ou série
    </Text>
  </TouchableOpacity>
);

export const CustomLastPlay = ({
  title,
  onPress,
  cover = [],
  line = false,
}: Props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        {!line && (
          <>
            <View style={styles.line} />
            <Feather
              name="chevron-right"
              size={30}
              color={Colors.white}
              onPress={onPress}
            />
          </>
        )}
      </View>

      <FlatList
        data={cover}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <Image
            source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
            style={styles.image}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => <EmptyListComponent onPress={onPress} />}
        removeClippedSubviews={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: dynamicSize(15),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: dynamicSize(10),
  },
  title: {
    fontSize: dynamicSize(20),
    fontFamily: 'Poppins-Regular',
    color: Colors.white,
    marginRight: dynamicSize(10),
  },
  line: {
    flex: 1,
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    marginRight: dynamicSize(10),
  },
  listContent: {
    paddingRight: dynamicSize(15),
  },
  image: {
    width: dynamicSize(120),
    height: dynamicSize(200),
    borderRadius: dynamicSize(8),
    marginRight: dynamicSize(10),
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    padding: dynamicSize(20),
  },
  emptyText: {
    color: Colors.blue,
    fontSize: dynamicSize(14),
  },
});
