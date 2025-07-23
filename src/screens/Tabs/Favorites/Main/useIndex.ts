import {Alert} from '@/src/components/Alert';
import {baseUrl, theMovieKey} from '@/src/config';
import {api} from '@/src/services/api';
import {Favorites} from '@/src/types/Auth';
import {PropsScreen} from '@/src/types/Navigation';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';

export type PropsCustomShowFavorites = {
  id: number;
  title?: string;
  name?: string; // para séries pode vir como "name"
  release_date?: string; // filmes
  first_air_date?: string; // séries
  genres: {id: number; name: string}[];
  vote_average: number;
  vote_count: number;
  poster_path: string;
};

export const useIndex = ({navigation, route}: PropsScreen) => {
  const [favorites, setFavorites] = useState<PropsCustomShowFavorites[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<Alert>(null);

  const getFavorites = async () => {
    setLoading(true);
    const response = await api.get<Favorites[]>('/media/favoritos');

    if (!response.success) {
      console.error(
        'Erro ao buscar favoritos:',
        response.error || 'Erro desconhecido',
      );
      return;
    }

    if (response.success && response.data) {
      const idsWithType = response.data.map(item => ({
        id: item.tituloId,
        type: item.type,
      }));

      if (idsWithType.length > 0) {
        const results = await Promise.all(
          idsWithType.map(({id, type}) => fetchMedia(id, type ?? 'movie')),
        );
        console.log('Resultados obtidos:', JSON.stringify(results, null, 2));
        setFavorites(results);
      } else {
        setFavorites([]);
      }
    }

    setLoading(false);
  };

  const fetchMedia = async (id: number, type: string) => {
    const res = await fetch(`${baseUrl}/${type}/${id}?language=pt-BR`, {
      headers: {Authorization: theMovieKey},
    });
    if (!res.ok) {
      throw res;
    }
    const data = await res.json();
    return {
      ...data,
      type,
    } as PropsCustomShowFavorites;
  };

  useFocusEffect(
    useCallback(() => {
      getFavorites();
    }, []),
  );

  const unfavorite = async (favoriteId: number) => {
    const response = await api.remove(`/media/remover-favorito/${favoriteId}`);
    if (response.success) {
      setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
      console.log('removido');
      setAlert({
        title: 'Sucesso',
        message: 'Favorito removido com sucesso!',
      });
    } else {
      setAlert({title: 'Alerta', message: response.error});
    }
  };

  const goToDetails = (filme: PropsCustomShowFavorites) => {
    navigation.navigate('Details', {filme});
  };

  const IMG_BASE = 'https://image.tmdb.org/t/p/w200';

  return {
    favorites,
    IMG_BASE,
    unfavorite,
    goToDetails,
    loading,
    alert,
    setAlert,
  };
};
