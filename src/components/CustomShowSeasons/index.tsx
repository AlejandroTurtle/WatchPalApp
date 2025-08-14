import {Colors} from '@/src/config';
import {Episodes, Seasons} from '@/src/screens/Tabs/Home/Details/useIndex';
import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {api} from '@/src/services/api';
import {CheckBox} from '../CheckBox';
import {ProgressWatched} from '../ProgressWatched';
import {Alert, CustomAlert} from '../Alert';
import {
  useSeriesDispatch,
  useSeriesState,
} from '@/src/context/useReducerSeries';

type PropsCustomShowSeasons = {
  seasons: Seasons[];
  episodes: Episodes[];
  tituloId: number;
  numberOfSeasons: number;
};

type ResponseWatchedEpisodes = {
  tituloId: number;
  season: number;
  episode: number;
  duration: number;
  watchedAt: string;
};

export const CustomShowSeasons = ({
  seasons,
  episodes,
  tituloId,
  numberOfSeasons,
}: PropsCustomShowSeasons) => {
  const {colors} = useTheme();
  const [expandedEpisodes, setExpandedEpisodes] = useState<{
    [key: string]: boolean;
  }>({});
  const [expandedSeasons, setExpandedSeasons] = useState<number[]>([]);
  const [watchedEpisodes, setWatchedEpisodes] = useState<string[]>([]);
  const [markingSeries, setMarkingSeries] = useState(false);
  const [alert, setAlert] = useState<Alert>(null);
  const seriesState = useSeriesState();
  const seriesDispatch = useSeriesDispatch();

  const showDescription = (season: number, episode: number) => {
    const key = `${season}-${episode}`;
    setExpandedEpisodes(prev => ({...prev, [key]: !prev[key]}));
  };

  const toggleSeason = (seasonNumber: number) => {
    setExpandedSeasons(prev =>
      prev.includes(seasonNumber)
        ? prev.filter(n => n !== seasonNumber)
        : [...prev, seasonNumber],
    );
  };

  useEffect(() => {
    if (seasons.length > 0) {
      setExpandedSeasons([0, 1]);
    }
  }, [seasons]);

  useEffect(() => {
    const loadWatched = async () => {
      const response = await api.get<ResponseWatchedEpisodes[]>(
        '/media/episodios/assistidos',
      );
      if (response.success && response.data) {
        const myKeys = response.data
          .filter(e => e.tituloId === tituloId)
          .map(e => `${e.season}-${e.episode}`);
        setWatchedEpisodes(myKeys);
      }
    };

    loadWatched();
  }, [tituloId]);

  async function markAsWatched(key: string, duration: number) {
    const [season, episode] = key.split('-').map(Number);
    const body = {
      tituloId,
      season,
      episode,
      duration,
    };
    const response = await api.post('/media/episodios/assistidos', body);
    if (response.success) {
      setWatchedEpisodes(prev => [...prev, key]);
      seriesDispatch({
        type: 'SET_EPISODES_WATCHED',
        payload: seriesState.episodesWatched + 1,
      });
      seriesDispatch({
        type: 'SET_HOURS_WATCHED',
        payload: seriesState.hoursWatched + duration / 60,
      });
    }
  }

  //REMOVER ESSE ENDPOINT NO FUTURO
  async function unmarkAsWatched(key: string) {
    const [season, episode] = key.split('-').map(Number);

    const response = await api.remove(
      `/media/episodios/assistidos/${tituloId}/${season}/${episode}`,
    );
    if (response.success) {
      setWatchedEpisodes(prev => prev.filter(k => k !== key));
      seriesDispatch({
        type: 'SET_EPISODES_WATCHED',
        payload: seriesState.episodesWatched - 1,
      });
    }
  }

  const toggleWatched = async (key: string, duration: number) => {
    const isWatched = watchedEpisodes.includes(key);

    if (isWatched) {
      await unmarkAsWatched(key);
    } else {
      await markAsWatched(key, duration);
    }
  };

  async function markSeasonAsWatched(
    seasonNumber: number,
    episodesInSeason: Episodes[],
  ) {
    try {
      const newWatchedKeys: string[] = [];

      for (const episode of episodesInSeason) {
        const key = `${seasonNumber}-${episode.episode_number}`;

        if (watchedEpisodes.includes(key)) {
          continue;
        }

        const body = {
          tituloId,
          season: seasonNumber,
          episode: episode.episode_number,
          duration: episode.runtime,
        };

        await api.post('/media/episodios/assistidos', body);
        newWatchedKeys.push(key);
      }

      setWatchedEpisodes(prev => [...prev, ...newWatchedKeys]);
    } catch (err) {
      console.error('Erro ao completar temporada', err);
    }
  }

  const markSeriesAsWatchedAll = () => {
    setAlert({
      title: 'Aviso',
      message:
        'Tem certeza que deseja marcar todos os episódios desta série como assistidos?',
      onPress: () => markSeries(),
      buttonText: 'Sim',
      cancel: true,
    });
  };
  const markSeries = async () => {
    setMarkingSeries(true);
    try {
      const newWatchedKeys: string[] = [];

      for (const episode of episodes.filter(e => e.season_number !== 0)) {
        const key = `${episode.season_number}-${episode.episode_number}`;

        if (watchedEpisodes.includes(key)) {
          continue;
        }

        const body = {
          tituloId,
          season: episode.season_number,
          episode: episode.episode_number,
          duration: episode.runtime,
        };

        await api.post('/media/episodios/assistidos', body);
        newWatchedKeys.push(key);
      }
      await api.post('/media/series/concluidas', {
        tituloId,
      });
      seriesDispatch({
        type: 'SET_SERIES_COMPLETED',
        payload: seriesState.seriesCompleted + 1,
      });

      setWatchedEpisodes(prev => [...prev, ...newWatchedKeys]);
    } catch (err) {
      console.error('Erro ao completar série', err);
      setAlert({
        title: 'Aviso',
        message: 'Não foi possível completar a série. Tente novamente.',
      });
    } finally {
      setMarkingSeries(false);
    }
  };

  const allEpisodes = episodes.filter(e => e.season_number !== 0);
  const totalEpsAll = allEpisodes.length;
  const watchedCountAll = allEpisodes
    .map(ep => `${ep.season_number}-${ep.episode_number}`)
    .filter(key => watchedEpisodes.includes(key)).length;

  const styles = StyleSheet.create({
    seasonContainer: {
      marginBottom: 20,
    },
    seasonTitle: {
      fontSize: 24,
      fontFamily: 'Poppins-SemiBold',
      color: colors.text,
    },
    episodeTitle: {
      fontSize: 12,
      fontFamily: 'Poppins-SemiBold',
      color: colors.text,
    },
    descriptionEpisode: {
      fontSize: 10,
      fontFamily: 'Poppins-Regular',
      color: Colors.gray300,
    },
    rowTime: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    timeEpisode: {
      fontSize: 10,
      fontFamily: 'Poppins-Regular',
      color: Colors.gray300,
      marginLeft: 3,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    episodeRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    radio: {
      marginRight: 8,
      marginTop: 4,
    },
    episodeInfo: {
      flex: 1,
    },
    countEpisode: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 12,
      color: Colors.white,
      marginLeft: 5,
    },
    seriesHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    completeSeriesButton: {
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 6,
      marginLeft: 8,
      borderWidth: 1,
      borderColor: Colors.blue,
      backgroundColor: Colors.white,
    },
    completeSeriesButtonActive: {
      backgroundColor: Colors.blue,
      borderColor: Colors.blue,
    },
    completeSeriesText: {
      fontSize: 12,
      color: Colors.blue,
    },
    completeSeriesTextActive: {
      color: Colors.white,
    },
  });

  return (
    <View>
      {/* Cabeçalho da série: botão único para "Completar Série" + progresso geral */}
      <View style={styles.seriesHeader}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.seasonTitle, {fontSize: 20}]}>
            Total de temporadas:
          </Text>
          <Text style={[styles.countEpisode, {fontSize: 20}]}>
            {numberOfSeasons}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.completeSeriesButton,
            watchedCountAll === totalEpsAll &&
              styles.completeSeriesButtonActive,
          ]}
          disabled={watchedCountAll === totalEpsAll || markingSeries}
          onPress={markSeriesAsWatchedAll}>
          {markingSeries ? (
            <ActivityIndicator />
          ) : (
            <Text
              style={[
                styles.completeSeriesText,
                watchedCountAll === totalEpsAll &&
                  styles.completeSeriesTextActive,
              ]}>
              {watchedCountAll === totalEpsAll
                ? 'Série completa'
                : 'Completar Série'}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {seasons
        .filter(season => season.season_number !== 0)
        .map(season => {
          const allEpisodes = episodes.filter(
            episode => episode.season_number === season.season_number,
          );
          const totalEps = allEpisodes.length;
          const watchedCount = allEpisodes
            .map(ep => `${season.season_number}-${ep.episode_number}`)
            .filter(key => watchedEpisodes.includes(key)).length;
          const progress = totalEps > 0 ? watchedCount / totalEps : 0;
          const isSeasonExpanded = expandedSeasons.includes(
            season.season_number,
          );
          return (
            <View key={season.season_number}>
              <TouchableOpacity
                style={[styles.row, {alignItems: 'center'}]}
                onPress={() => toggleSeason(season.season_number)}>
                <Text style={styles.seasonTitle}>
                  Temporada {season.season_number}
                </Text>

                <Feather
                  name={isSeasonExpanded ? 'chevron-up' : 'chevron-down'}
                  size={30}
                  color={Colors.white}
                  style={{marginTop: 5, marginBottom: 10, marginLeft: 8}}
                />
              </TouchableOpacity>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ProgressWatched progress={progress} />

                <Text style={styles.countEpisode}>
                  {watchedCount}/{totalEps}
                </Text>
              </View>
              {isSeasonExpanded &&
                allEpisodes.map(episode => {
                  const key = `${season.season_number}-${episode.episode_number}`;
                  const isEpExpanded = expandedEpisodes[key];
                  return (
                    <View key={key} style={styles.episodeRow}>
                      <CheckBox
                        value={key}
                        checked={watchedEpisodes.includes(key)}
                        onPress={() => toggleWatched(key, episode.runtime)}
                        disabled={watchedCountAll === totalEpsAll}
                      />

                      <View style={styles.episodeInfo}>
                        <Text style={styles.episodeTitle}>
                          Episódio {episode.episode_number}: {episode.name}
                        </Text>
                        <Text
                          style={styles.descriptionEpisode}
                          numberOfLines={isEpExpanded ? undefined : 1}>
                          {episode.overview || 'Sem descrição.'}
                        </Text>
                        {episode.overview.length > 100 && (
                          <TouchableOpacity
                            onPress={() =>
                              showDescription(
                                season.season_number,
                                episode.episode_number,
                              )
                            }>
                            <Text
                              style={[
                                styles.descriptionEpisode,
                                {
                                  fontFamily: 'Poppins-SemiBold',
                                  color: Colors.blue,
                                },
                              ]}>
                              {isEpExpanded ? 'Ler menos' : 'Ler mais'}
                            </Text>
                          </TouchableOpacity>
                        )}
                        <View style={styles.rowTime}>
                          <Feather
                            name="clock"
                            size={16}
                            color={Colors.gray300}
                          />
                          <Text style={styles.timeEpisode}>
                            {episode.runtime}min
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
            </View>
          );
        })}
      <CustomAlert alert={alert} setAlert={setAlert} />
    </View>
  );
};
