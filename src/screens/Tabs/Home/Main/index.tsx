import React from 'react';
import {CustomHeaderHome} from './Extends/CustomHeaderHome';
import {CustomScreenContainer} from '@/src/components/CustomScreenContainer';
import {PropsScreen} from '@/src/types/Navigation';
import {CustomLastPlay} from '@/src/components/CustomLastPlay';
import {useIndex} from './useIndex';
import {ScrollView} from 'react-native';

export const Home = ({navigation, route}: PropsScreen) => {
  const {filmsonAir, mostRated, mostPopular} = useIndex({navigation, route});
  return (
    <CustomScreenContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 120}} // Adicione aqui
        style={{flexGrow: 1}}>
        <CustomHeaderHome onPress={() => {}} />

        <CustomLastPlay
          title="Últimos assistidos"
          onPress={() => {
            console.log('click');
          }}
        />
        <CustomLastPlay
          title="Filmes em cartaz no cinema"
          onPress={() => {
            console.log('click');
          }}
          cover={filmsonAir}
          line
        />
        <CustomLastPlay
          title="Filmes com melhores avaliações"
          onPress={() => {
            console.log('click');
          }}
          cover={mostRated}
          line
        />
        <CustomLastPlay
          title="Filmes mais populares"
          onPress={() => {
            console.log('click');
          }}
          cover={mostPopular}
          line
        />
      </ScrollView>
    </CustomScreenContainer>
  );
};
