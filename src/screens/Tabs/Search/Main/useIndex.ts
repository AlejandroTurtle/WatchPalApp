import {Filme} from '@/src/components/CustomListMedia';
import {baseUrl, theMovieKey} from '@/src/config';
import {PropsScreen} from '@/src/types/Navigation';
import {useEffect, useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';

type SearchProps = {
  busca: string;
};

export const useIndex = ({navigation, route}: PropsScreen) => {
  const {control, handleSubmit} = useForm<SearchProps>({
    defaultValues: {busca: ''},
  });
  const [media, setMedia] = useState<any[]>([]);
  const [popularSeries, setPopularSeries] = useState<any[]>([]);

  const SearchMedia = async (data: SearchProps) => {
    try {
      const encode = encodeURIComponent(data.busca);

      const response = await fetch(
        `${baseUrl}/search/multi?query=${encode}&language=pt-BR&region=BR`,
        {
          method: 'GET',
          headers: {
            Authorization: theMovieKey,
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await response.json();
      if (json.results) {
        json.results.map((item: Filme) => {
          if (item.poster_path !== null) {
            setMedia(json.results);
          }
        });
      }
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
    }
  };

  const getPopularTV = async (page = 1) => {
    try {
      const res = await fetch(
        `${baseUrl}/tv/popular?language=pt-BR&region=BR&page=${page}`,
        {
          method: 'GET',
          headers: {
            Authorization: theMovieKey,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error('Erro TMDb:', res.status, err);
        return;
      }

      const json = await res.json();
      if (!json.results || !Array.isArray(json.results)) {
        console.error('Formato inesperado de resultados:', json.results);
        return;
      }
      setPopularSeries(prev => [
        ...prev,
        ...json.results.map((item: Filme) => ({
          ...item,
          type: 'tv',
        })),
      ]);
    } catch (error) {
      console.error('Erro ao buscar séries populares:', error);
    } finally {
    }
  };

  useEffect(() => {
    getPopularTV();
  }, []);

  return {control, handleSubmit, SearchMedia, media, popularSeries};
};
