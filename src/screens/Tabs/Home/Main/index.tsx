import React from 'react';
import {CustomHeaderHome} from './Extends/CustomHeaderHome';
import {CustomScreenContainer} from '@/src/components/CustomScreenContainer';
import {PropsScreen} from '@/src/types/Navigation';
import {CustomLastPlay} from '@/src/components/CustomLastPlay';
import {useIndex} from './useIndex';
import {ScrollView} from 'react-native';
import {TextInput} from 'react-native-paper';

export const Home = ({navigation, route}: PropsScreen) => {
  const {filmsonAir, mostRated, mostPopular} = useIndex({navigation, route});
  const [text, setText] = React.useState('');
  return (
    <CustomScreenContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 120}}
        style={{flexGrow: 1}}>
        <CustomHeaderHome onPress={() => {}} />

        <CustomLastPlay
          title="Últimos assistidos"
          onClick={() => console.log('ultimos assistidos')}
        />
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
