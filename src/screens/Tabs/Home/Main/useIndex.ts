import {Filme} from '@/src/types/Filmes';
import {SvgProps} from 'react-native-svg';
import {PropsScreen} from '@/src/types/Navigation';
import {api} from '@/src/services/api';
import {useEffect, useState} from 'react';
import {baseUrl, theMovieKey} from '@/src/config';

export const useIndex = ({navigation, route}: PropsScreen) => {
  const [filmsonAir, setFilmsOnAir] = useState<Filme[]>([]);
  const [mostRated, setMostRated] = useState<Filme[]>([]);
  const [mostPopular, setMostPopular] = useState<Filme[]>([]);
  const getPopularFilms = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/movie/now_playing?language=pt-BR&region=BR`,
        {
          method: 'GET',
          headers: {
            Authorization: theMovieKey,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setFilmsOnAir(data.results);
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
    }
  };

  const getMostRated = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/movie/top_rated?language=pt-BR&region=BR`,
        {
          method: 'GET',
          headers: {
            Authorization: theMovieKey,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setMostRated(data.results);
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
    }
  };

  const getMostPopular = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/movie/popular?language=pt-BR&region=BR`,
        {
          method: 'GET',
          headers: {
            Authorization: theMovieKey,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setMostPopular(data.results);
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
    }
  };

  useEffect(() => {
    getPopularFilms();
    getMostRated();
    getMostPopular();
  }, []);

  return {filmsonAir, mostRated, mostPopular};
};
