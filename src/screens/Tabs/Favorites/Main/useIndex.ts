import {PropsCustomShowFavorites} from '@/src/components/CustomShowFavorites';
import {baseUrl, theMovieKey} from '@/src/config';
import {api} from '@/src/services/api';
import {Favorites} from '@/src/types/Auth';
import {PropsScreen} from '@/src/types/Navigation';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';

export const useIndex = ({navigation, route}: PropsScreen) => {
  const [myFavorites, setMyFavorites] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<
    PropsCustomShowFavorites['favorites']
  >([]);

  const getFavorites = async () => {
    const response = await api.get<Favorites[]>('/media/favoritos');

    if (!response.success) {
      console.error(
        'Erro ao buscar favoritos:',
        response.error || 'Erro desconhecido',
      );
      return;
    }

    if (response.success && response.data) {
      const ids = response.data.map(item => item.tituloId);
      setMyFavorites(ids);

      // Aqui adiciona:
      if (ids.length > 0) {
        const results = await Promise.all(ids.map(fetchMedia));
        setFavorites(results);
      } else {
        setFavorites([]); // Se não houver favoritos
      }
    }
  };

  console.log('Meus favoritos:', myFavorites);
  const fetchMedia = async (id: number) => {
    const tryFetch = async (type: 'movie' | 'tv') => {
      const res = await fetch(`${baseUrl}/${type}/${id}?language=pt-BR`, {
        headers: {Authorization: theMovieKey},
      });
      if (!res.ok) {
        throw res;
      }
      return res.json();
    };

    try {
      return await tryFetch('movie');
    } catch (errMovie) {
      return await tryFetch('tv');
    }
  };

  useFocusEffect(
    useCallback(() => {
      getFavorites();
    }, []),
  );

  return {favorites};
};
