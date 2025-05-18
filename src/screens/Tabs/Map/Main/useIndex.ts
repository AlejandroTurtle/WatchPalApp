import React, {useRef, useState, useEffect} from 'react';

import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import {requestLocationPermission} from '@/src/utils/requestLocationPermission';
import {CustomAlert, Alert as AlertType} from '@/src/components/Alert';
import {Linking} from 'react-native';
import {Event} from '@/src/types/Filmes';
import {PropsScreen} from '@/src/types/Navigation';

export const useIndex = ({navigation, route}: PropsScreen) => {};
