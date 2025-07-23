import {Colors} from '@/src/config';
import {Episodes, Seasons} from '@/src/screens/Tabs/Home/Details/useIndex';
import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {api} from '@/src/services/api';
import {CheckBox} from '../CheckBox';
import {ProgressWatched} from '../ProgressWatched';
type PropsCustomShowSeasons = {
  seasons: Seasons[];
  episodes: Episodes[];
  tituloId: number;
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
}: PropsCustomShowSeasons) => {
  const {colors} = useTheme();
  const [expandedEpisodes, setExpandedEpisodes] = useState<{
    [key: string]: boolean;
  }>({});
  const [expandedSeasons, setExpandedSeasons] = useState<number[]>([]);
  const [watchedEpisodes, setWatchedEpisodes] = useState<string[]>([]);
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
    await api.post('/media/episodios/assistidos', body);
    setWatchedEpisodes(prev => [...prev, key]);
  }

  async function unmarkAsWatched(key: string) {
    const [season, episode] = key.split('-').map(Number);
    try {
      await api.remove(
        `/media/episodios/assistidos/${tituloId}/${season}/${episode}`,
      );
      setWatchedEpisodes(prev => prev.filter(k => k !== key));
    } catch (err) {
      console.error('Erro desmarcando assistido', err);
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
  });

  return (
    <View>
      {seasons
        .filter(season => season.season_number !== 0) // <-- Adicionado filtro
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
                style={styles.row}
                onPress={() => toggleSeason(season.season_number)}>
                <Text style={styles.seasonTitle}>
                  Temporada {season.season_number}
                </Text>
                <Feather
                  name={isSeasonExpanded ? 'chevron-up' : 'chevron-down'}
                  size={30}
                  color={Colors.white}
                  style={{marginTop: 5, marginBottom: 10}}
                />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
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
    </View>
  );
};
