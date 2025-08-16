import React from 'react';
import {CustomHeaderHome} from './Extends/CustomHeaderHome';
import {CustomScreenContainer} from '@/src/components/CustomScreenContainer';
import {PropsScreen} from '@/src/types/Navigation';
import {CustomLastPlay} from '@/src/components/CustomLastPlay';
import {useIndex} from './useIndex';
import {ScrollView, View} from 'react-native';
import {ActivityIndicator, TextInput} from 'react-native-paper';
import {Colors} from '@/src/config';

export const Home = ({navigation, route}: PropsScreen) => {
  const {filmsonAir, mostRated, mostPopular, lastWatched, loading} = useIndex({
    navigation,
    route,
  });
  const [text, setText] = React.useState('');
  return (
    <CustomScreenContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 120}}
        style={{flexGrow: 1}}>
        <CustomHeaderHome
          onPress={() =>
            navigation.navigate('Buscar', {
              screen: 'Search',
            })
          }
        />
        {loading ? (
          <View>
            <ActivityIndicator size="small" color={Colors.blue} />
          </View>
        ) : (
          <CustomLastPlay
            title="Últimos assistidos"
            onClick={() => {
              navigation.navigate('Buscar', {
                screen: 'Search',
              });
            }}
            onPress={filme => {
              navigation.navigate('Details', {filme});
            }}
            cover={lastWatched}
          />
        )}
        <CustomLastPlay
          title="Filmes em cartaz no cinema"
          onPress={filme => {
            navigation.navigate('Details', {filme});
          }}
          cover={filmsonAir}
          line
        />
        <CustomLastPlay
          title="Filmes com melhores avaliações"
          onPress={filme => {
            navigation.navigate('Details', {filme});
          }}
          cover={mostRated}
          line
        />
        <CustomLastPlay
          title="Filmes mais populares"
          onPress={filme => {
            navigation.navigate('Details', {filme});
          }}
          cover={mostPopular}
          line
        />
      </ScrollView>
    </CustomScreenContainer>
  );
};
