import {Alert} from '@/src/components/Alert';
import {baseUrl, theMovieKey} from '@/src/config';
import {
  useSeriesDispatch,
  useSeriesState,
} from '@/src/context/useReducerSeries';
import {api} from '@/src/services/api';
import {Favorites} from '@/src/types/Auth';
import {PropsScreen} from '@/src/types/Navigation';
import {useCallback, useEffect, useState} from 'react';

export type PropsCustomShowFavorites = {
  id?: number;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  genres?: {id: number; name: string}[];
  vote_average?: number;
  vote_count?: number;
  poster_path?: string;
};

export const useIndex = ({navigation, route}: PropsScreen) => {
  const seriesState = useSeriesState();
  const seriesDispatch = useSeriesDispatch();
  const [favorites, setFavorites] = useState<PropsCustomShowFavorites[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<Alert>(null);

  const getFavorites = useCallback(async () => {
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
        setFavorites(results);
        seriesDispatch({type: 'SET_MEDIA_FAVORITE', payload: results});
      } else {
        setFavorites([]);
        seriesDispatch({type: 'SET_MEDIA_FAVORITE', payload: []});
      }
    }

    setLoading(false);
  }, []);
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

  useEffect(() => {
    getFavorites();
  }, []);

  const unfavorite = async (favoriteId: number) => {
    const response = await api.remove(`/media/remover-favorito/${favoriteId}`);
    if (response.success) {
      setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
      setAlert({
        title: 'Sucesso',
        message: 'Favorito removido com sucesso!',
      });
      seriesDispatch({type: 'REMOVE_MEDIA_FAVORITE', payload: favoriteId});
    } else {
      setAlert({title: 'Alerta', message: response.error});
    }
  };

  const goToDetails = (filme: PropsCustomShowFavorites) => {
    navigation.navigate('Details', {filme});
  };

  const IMG_BASE = 'https://image.tmdb.org/t/p/w200';

  return {
    favorites: seriesState.favorites,
    IMG_BASE,
    unfavorite,
    goToDetails,
    loading,
    alert,
    setAlert,
  };
};
