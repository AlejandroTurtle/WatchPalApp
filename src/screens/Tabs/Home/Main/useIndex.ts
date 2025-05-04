import Theather from '@/assets/theater.svg';
import Guitar from '@/assets/guitar.svg';
import Microphone from '@/assets/microphone.svg';
import Children from '@/assets/children.svg';
import Dish from '@/assets/dish.svg';
import {Event} from '@/types/Event';
import {SvgProps} from 'react-native-svg';
import {PropsScreen} from '@/src/types/Navigation';
import {api} from '@/src/services/api';
import {useEffect, useState} from 'react';

export type CardEvent = {
  icon: React.FC<SvgProps>; // <- ajuste aqui
  name: string;
};

export type EventsType = {
  id: number;
  imagem: string;
  nome: string;
};

export const useIndex = ({navigation, route}: PropsScreen) => {
  const [cardEvents, setCardEvents] = useState<EventsType[]>();
  const [bannerEvents, setBannerEvents] = useState<Event[]>();

  const getEventsType = async () => {
    const response = await api.get<EventsType[]>('eventos/tipos');
    if (response.success) {
      setCardEvents(response.data);
    }
  };

  const getBannerEvents = async () => {
    const response = await api.get<Event[]>('eventos/home');
    if (response.success) {
      setBannerEvents(response.data);
    }
  };

  useEffect(() => {
    getEventsType();
    getBannerEvents();
  }, []);

  return {cardEvents, bannerEvents};
};
