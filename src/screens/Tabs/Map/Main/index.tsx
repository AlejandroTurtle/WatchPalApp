import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Image,
  Pressable,
  Text,
  Alert,
  Dimensions,
  FlatList,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useIndex} from './useIndex';
import Feather from 'react-native-vector-icons/Feather';
import {CustomAlert} from '@/src/components/Alert';
import {PropsScreen} from '@/src/types/Navigation';

export const MapEvents = ({navigation, route}: PropsScreen) => {
  return <></>;
};
