import {Alert} from '@/src/components/Alert';
import {baseUrl, theMovieKey} from '@/src/config';
import {profileContext} from '@/src/context/profileContext';
import {
  useSeriesDispatch,
  useSeriesState,
} from '@/src/context/useReducerSeries';
import {api} from '@/src/services/api';
import {Favorites} from '@/src/types/Auth';
import {PropsScreen} from '@/src/types/Navigation';
import {useEffect, useState} from 'react';

export interface MovieResult {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  original_name?: string;
  name?: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type Seasons = {
  name: string;
  season_number: number;
  episode_count: number;
};

export type Episodes = {
  episode_number: number;
  overview: string;
  runtime: number;
  season_number: number;
  name: string;
};

export const useIndex = ({navigation, route}: PropsScreen) => {
  const {filme} = route.params;
  const [data, setData] = useState<MovieResult>();
  const {profile} = profileContext();
  const [alert, setAlert] = useState<Alert>(null);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [seasons, setSeasons] = useState<Seasons[]>([]);
  const [episodes, setEpisodes] = useState<Episodes[]>([]);
  const [numberOfSeasons, setNumberOfSeasons] = useState<number>(0);
  const seriesState = useSeriesState();
  const seriesDispatch = useSeriesDispatch();

  console.log('FILME DETALHES: ', JSON.stringify(filme, null, 2));

  useEffect(() => {
    const favoritos = profile?.favorites ?? [];
    const favoriteIds = favoritos.map(fav => fav.tituloId);
    const isFavorito = favoriteIds.includes(filme.id);

    setFavorite(isFavorito);
  }, [profile?.favorites, filme.id]);

  let type;

  if (filme.media_type === 'movie' || filme.type === 'movie') {
    type = 'movie';
    console.log('1 if');
  } else if (filme.media_type === 'tv' || filme.type === 'tv') {
    type = 'tv';
    console.log('2 if');
  } else {
    type = 'tv';
    console.log('3  if');
  }

  const getDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/${type}/${filme.id}?language=pt-BR&region=BR`,
        {
          method: 'GET',
          headers: {
            Authorization: theMovieKey,
            'Content-Type': 'application/json',
          },
        },
      );
      const _data: any = await response.json();
      setData(_data);
      console.log('DETALHES: ', JSON.stringify(type, null, 2));
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
    if (type === 'tv') {
      getAllEpisodes();
    }
  }, []);

  const addFavorite = async () => {
    const body = {
      userId: profile?.id,
      tituloId: filme.id,
      titulo: filme.original_title ?? filme.original_name,
      type: filme.media_type ?? filme.type,
    };
    console.log('Body:', JSON.stringify(body, null, 2));
    const response = await api.post('/media/adicionar-favorito', body);
    if (response.success) {
      setFavorite(true);
      setAlert({
        title: 'Sucesso',
        message: 'Filme adicionado aos favoritos com sucesso!',
      });
      const payload = {
        id: filme.id,
        title:
          filme.title ??
          filme.original_title ??
          filme.name ??
          filme.original_name,
        name: filme.name ?? filme.original_name,
        release_date: filme.release_date,
        first_air_date: filme.first_air_date,
        poster_path: filme.poster_path,
        vote_average: data?.vote_average ?? filme.vote_average,
        vote_count: data?.vote_count ?? filme.vote_count,
        type: filme.media_type ?? filme.type ?? 'movie',
        genres: filme.genres ?? [],
      };
      seriesDispatch({type: 'ADD_MEDIA_FAVORITE', payload});
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
      seriesDispatch({type: 'REMOVE_MEDIA_FAVORITE', payload: filme.id});
    } else {
      setAlert({title: 'Alerta', message: response.error});
    }
  };

  const getAllEpisodes = async () => {
    setLoading(true);
    try {
      const respSeasons = await fetch(
        `${baseUrl}/tv/${filme.id}?language=pt-BR&region=BR`,
        {
          method: 'GET',
          headers: {
            Authorization: theMovieKey,
            'Content-Type': 'application/json',
          },
        },
      );
      const jsonSeasons: any = await respSeasons.json();
      const allSeasons: Seasons[] = jsonSeasons.seasons;
      setSeasons(allSeasons);
      setNumberOfSeasons(jsonSeasons.number_of_seasons);

      const promises = allSeasons.map(season =>
        fetch(
          `${baseUrl}/tv/${filme.id}/season/${season.season_number}?language=pt-BR&region=BR`,
          {
            method: 'GET',
            headers: {
              Authorization: theMovieKey,
              'Content-Type': 'application/json',
            },
          },
        )
          .then(res => res.json())
          .then((_data: any) => _data.episodes as Episodes[]),
      );

      const episodesArrays = await Promise.all(promises);
      const flatEpisodes = episodesArrays.flat();

      setEpisodes(flatEpisodes);
    } catch (error) {
      console.error('Erro ao buscar episódios:', error);
      setAlert({
        title: 'Alerta',
        message: 'Não foi possível carregar episódios.',
      });
    } finally {
      setLoading(false);
    }
  };
  return {
    data,
    addFavorite,
    alert,
    setAlert,
    favorite: seriesState.favorites.find(f => f.id === filme.id),
    removeFavorite,
    loading,
    episodes,
    seasons,
    numberOfSeasons,
    type,
  };
};
