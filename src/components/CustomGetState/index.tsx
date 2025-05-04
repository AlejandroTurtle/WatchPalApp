// src/components/CustomGetState.tsx
import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
  Linking,
  AppState,
  AppStateStatus,
} from 'react-native';
import GetLocation from 'react-native-get-location';
import Feather from 'react-native-vector-icons/Feather';
import Estados from '@/src/utils/Estados.json';
import {Colors, dynamicSize} from '@/src/config';
import {CustomAlert, Alert as AlertType} from '@/src/components/Alert';
import {requestLocationPermission} from '@/src/utils/requestLocationPermission';
import {useFocusEffect} from '@react-navigation/native';

interface CustomGetStateProps {
  onSelect: (state: string) => void;
}

export const CustomGetState: React.FC<CustomGetStateProps> = ({onSelect}) => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<AlertType>(null);
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const askedSettings = useRef(false);

  useEffect(() => {
    (async () => {
      const granted = await requestLocationPermission();
      if (granted) {
        fetchLocationAndSetState();
      } else {
        setLoading(false);
        setAlert({
          title: 'Alerta',
          message:
            'Para pré-selecionar seu estado precisamos de permissão de localização. Habilite-a nas configurações do app.',
          cancel: false,
          buttonText: 'Abrir configurações',
          onPress: () => {
            askedSettings.current = true;
            setAlert(null);
            Linking.openSettings();
          },
        });
      }
    })();

    const sub = AppState.addEventListener('change', handleAppStateChange);
    return () => sub.remove();
  }, []);

  const handleAppStateChange = (nextState: AppStateStatus) => {
    if (
      askedSettings.current &&
      appState.current.match(/inactive|background/) &&
      nextState === 'active'
    ) {
      askedSettings.current = false;
      setLoading(true);
      requestLocationPermission().then(granted => {
        if (granted) {
          fetchLocationAndSetState();
        } else {
          setLoading(false);
        }
      });
    }
    appState.current = nextState;
  };

  const fetchLocationAndSetState = () => {
    GetLocation.getCurrentPosition({enableHighAccuracy: true, timeout: 15000})
      .then(location => {
        const {latitude, longitude} = location;
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        )
          .then(res => res.json())
          .then(json => {
            const stateName = json.address?.state;
            if (stateName) {
              const found = Estados.find(
                e => e.nome.toLowerCase() === stateName.toLowerCase(),
              );
              if (found) {
                setSelectedState(found.nome);
                onSelect(found.nome);
              }
            }
          })
          .catch(err => console.warn(err))
          .finally(() => setLoading(false));
      })
      .catch(err => {
        console.warn(err);
        setLoading(false);
      });
  };

  const handleSelect = (item: {nome: string}) => {
    setSelectedState(item.nome);
    onSelect(item.nome);
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={Colors.purple} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.picker}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}>
        <Feather name="map-pin" size={20} style={styles.icon} />
        <Text style={styles.text}>
          {selectedState || 'Selecione seu estado'}
        </Text>
        <Feather
          name={modalVisible ? 'chevron-up' : 'chevron-down'}
          size={20}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={Estados}
              keyExtractor={(_, index) => String(index)}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelect(item)}>
                  <Text style={styles.itemText}>{item.nome}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      <CustomAlert alert={alert} setAlert={setAlert} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginHorizontal: dynamicSize(15),
  },
  loadingContainer: {
    marginVertical: dynamicSize(10),
    alignItems: 'center',
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: dynamicSize(8),
  },
  icon: {
    marginHorizontal: dynamicSize(8),
    color: Colors.purple,
  },
  text: {
    fontSize: dynamicSize(16),
    color: Colors.black,
    fontFamily: 'Poppins-Medium',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: dynamicSize(20),
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: dynamicSize(10),
    maxHeight: '60%',
    paddingVertical: dynamicSize(10),
  },
  item: {
    paddingVertical: dynamicSize(14),
    paddingHorizontal: dynamicSize(20),
  },
  itemText: {
    fontSize: dynamicSize(16),
    color: Colors.black,
  },
});
