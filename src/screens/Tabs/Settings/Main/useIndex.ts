import {profileContext} from '@/src/context/profileContext';
import {cleanAllItemAsync} from '@/src/libs/AsyncStorage';
import {deleteToken} from '@/src/libs/Firebase/messaging';
import {
  useSeriesDispatch,
  useSeriesState,
} from '@/src/context/useReducerSeries';
import {api} from '@/src/services/api';
import {PropsScreen} from '@/src/types/Navigation';
import {useEffect, useState} from 'react';

export const useIndex = ({navigation, route}: PropsScreen) => {
  const {profile} = profileContext();

  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useSeriesDispatch();
  const seriesState = useSeriesState();

  const getConcludedSeries = async () => {
    setLoading(true);
    const response = await api.get<any>('/media/series/concluidas');
    if (response.success && response.data) {
      dispatch({
        type: 'SET_SERIES_COMPLETED',
        payload: response.data.length,
      });
    }
    setLoading(false);
  };

  const getWatchedEpisodes = async () => {
    setLoading(true);
    const response = await api.get<any[]>('/media/episodios/assistidos');
    if (response.success && response.data) {
      const totalMinutes = response.data.reduce(
        (acc, ep) => acc + (ep.duration || 0),
        0,
      );

      const totalHours = totalMinutes / 60;

      dispatch({
        type: 'SET_EPISODES_WATCHED',
        payload: response.data.length,
      });
      dispatch({
        type: 'SET_HOURS_WATCHED',
        payload: totalHours,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getConcludedSeries();
    getWatchedEpisodes();
  }, [seriesState.seriesCompleted]);

  return {
    profile,
    loading,
    seriesState,
  };
};
