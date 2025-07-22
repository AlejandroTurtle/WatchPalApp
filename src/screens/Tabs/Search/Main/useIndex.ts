import {Filme} from '@/src/components/CustomListMedia';
import {baseUrl, theMovieKey} from '@/src/config';
import {PropsScreen} from '@/src/types/Navigation';
import {useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';

type SearchProps = {
  busca: string;
};

export const useIndex = ({navigation, route}: PropsScreen) => {
  const {control, handleSubmit} = useForm<SearchProps>({
    defaultValues: {busca: ''},
  });
  const [media, setMedia] = useState<any[]>([]);

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
        setMedia(json.results);
      }
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
    }
  };

  return {control, handleSubmit, SearchMedia, media};
};
