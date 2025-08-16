import {Filme} from '@/src/types/Filmes';
import {PropsScreen} from '@/src/types/Navigation';
import {api} from '@/src/services/api';
import {useEffect, useState} from 'react';
import {baseUrl, theMovieKey} from '@/src/config';
import {useSeriesState} from '@/src/context/useReducerSeries';

export interface lastWatched {
  id: string;
  userId: string;
  tituloId: number;
  season: number;
  episode: number;
  duration: number;
  watchedAt: string;
}

export const useIndex = ({navigation, route}: PropsScreen) => {
  const seriesState = useSeriesState();
  const [filmsonAir, setFilmsOnAir] = useState<Filme[]>([]);
  const [mostRated, setMostRated] = useState<Filme[]>([]);
  const [mostPopular, setMostPopular] = useState<Filme[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastWatched, setLastWatched] = useState<Filme[]>([]);
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
      setFilmsOnAir(prev => [
        ...prev,
        ...data.results.map((item: Filme) => ({...item, type: 'movie'})),
      ]);
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
      setMostRated(prev => [
        ...prev,
        ...data.results.map((item: Filme) => ({...item, type: 'movie'})),
      ]);
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
      setMostPopular(prev => [
        ...prev,
        ...data.results.map((item: Filme) => ({...item, type: 'movie'})),
      ]);
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
    }
  };

  // --- dentro do hook useIndex ---
  const getLastWatched = async () => {
    try {
      setLoading(true);
      const response = await api.get<lastWatched[]>(
        '/media/episodios/assistidos',
      );

      if (response.success && response.data && response.data.length > 0) {
        const watchedEpisodes = response.data.filter(
          (item: lastWatched, index: number, self: lastWatched[]) =>
            index === self.findIndex(ep => ep.tituloId === item.tituloId),
        );

        const tituloIds = watchedEpisodes.map(ep => ep.tituloId);

        const details = await Promise.all(
          tituloIds.map(async tituloId => {
            try {
              const res = await fetch(
                `${baseUrl}/tv/${tituloId}?language=pt-BR&region=BR`,
                {
                  method: 'GET',
                  headers: {
                    Authorization: theMovieKey,
                    'Content-Type': 'application/json',
                  },
                },
              );
              const data = await res.json();
              return {...data, type: 'tv'} as unknown as Filme;
            } catch (err) {
              console.error(
                `Erro ao buscar detalhes do titulo ${tituloId}:`,
                err,
              );
              return null;
            }
          }),
        );

        const validDetails = details.filter(Boolean) as Filme[];
        setLastWatched(validDetails);
      } else {
        setLastWatched([]);
      }
    } catch (error) {
      console.error('Erro ao buscar últimos assistidos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPopularFilms();
    getMostRated();
    getMostPopular();
    getLastWatched();
  }, []);

  useEffect(() => {
    getLastWatched();
  }, [seriesState.episodesWatched]);

  return {filmsonAir, mostRated, mostPopular, loading, lastWatched};
};
