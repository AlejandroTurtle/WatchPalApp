import {Alert} from '@/src/components/Alert';
import {baseUrl, theMovieKey} from '@/src/config';
import {profileContext} from '@/src/context/profileContext';
import {api} from '@/src/services/api';
import {PropsScreen} from '@/src/types/Navigation';
import {useEffect, useState} from 'react';

interface MovieResult {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const useIndex = ({navigation, route}: PropsScreen) => {
  const {filme} = route.params;
  const params = route.params;
  const [data, setData] = useState<MovieResult>();
  const {profile} = profileContext();
  const [alert, setAlert] = useState<Alert>(null);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const favoritos = profile?.favorites ?? [];

    const isFavorito = favoritos.some(fav => fav.tituloId === filme.id);

    setFavorite(isFavorito);
  }, [profile?.favorites, filme.id]);

  const getDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/movie/${filme.id}?language=pt-BR&region=BR`,
        {
          method: 'GET',
          headers: {
            Authorization: theMovieKey,
            'Content-Type': 'application/json',
          },
        },
      );
      const _data: MovieResult = await response.json();
      setData(_data);
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, [filme.original_title]);

  const addFavorite = async () => {
    const body = {
      userId: profile?.id,
      tituloId: filme.id,
      titulo: filme.original_title,
    };
    const response = await api.post('/media/adicionar-favorito', body);
    if (response.success) {
      setFavorite(true);
      setAlert({
        title: 'Sucesso',
        message: 'Filme adicionado aos favoritos com sucesso!',
      });
    } else {
      setAlert({title: 'Alerta', message: response.error});
    }
  };

  const removeFavorite = async () => {
    const response = await api.remove(`/media/remover-favorito/${filme.id}`);
    if (response.success) {
      setFavorite(false);
      setAlert({
        title: 'Sucesso',
        message: 'Filme removido dos favoritos com sucesso!',
      });
    } else {
      setAlert({title: 'Alerta', message: response.error});
    }
  };

  return {
    data,
    addFavorite,
    alert,
    setAlert,
    favorite,
    removeFavorite,
    loading,
  };
};
