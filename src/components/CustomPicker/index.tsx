import {Colors, dynamicSize} from '@/src/config';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface CustomPickerProps {
  title?: string;
  items: {id: any; nome: string}[];
  keyName: string;
  value: [any, React.Dispatch<React.SetStateAction<any>>];
  color?: string;
  width?: number;
  onSelect?: (id: any) => void;
}

export const CustomPicker: React.FC<CustomPickerProps> = ({
  title,
  items,
  value,
  keyName,
  color,
  width,
  onSelect,
}) => {
  const [inputValue, setInputValue] = value;
  const [isModalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (inputValue?.error?.[keyName]) {
      setInputValue((prev: any) => ({
        ...prev,
        error: {...prev.error, [keyName]: undefined},
      }));
    }
  }, [inputValue?.[keyName]]);

  const handleSelect = (item: any) => {
    setInputValue((prev: any) => ({
      ...prev,
      [keyName]: item.id,
      error: {},
    }));
    setModalVisible(false);
    if (onSelect) {
      onSelect(item.id);
    }
  };

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'flex-end',
    },
    inputContainer: {
      borderRadius: dynamicSize(12),
      height: dynamicSize(49),

      width: width || '100%',
      borderWidth: 1,
      borderColor: inputValue?.error?.[keyName]
        ? 'red'
        : Colors.purple
        ? Colors.gray
        : Colors.gray,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: dynamicSize(10),
    },
    titleText: {
      paddingLeft: dynamicSize(5),
      fontSize: dynamicSize(16),
      fontWeight: '400',
      textAlign: 'left',
      alignSelf: 'flex-start',
      color: color || Colors.black,
    },
    inputText: {
      fontSize: dynamicSize(16),
      color: color || Colors.black,
      flex: 1,
    },
    arrowIcon: {
      marginLeft: dynamicSize(10),
      color: Colors.purple,
    },
    modal: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: Colors.white,
      borderTopRightRadius: dynamicSize(20),
      borderTopLeftRadius: dynamicSize(20),
      borderRadius: dynamicSize(10),
      maxHeight: '50%',
    },
    item: {
      padding: dynamicSize(15),
      borderBottomColor: Colors.purple,
      borderBottomWidth: 1,
    },
    itemText: {
      fontSize: dynamicSize(16),
      color: Colors.black,
      textAlign: 'center',
    },
    closeModal: {
      textAlign: 'center',
      padding: dynamicSize(10),
      fontSize: dynamicSize(14),
      color: Colors.gray,
    },
    textError: {
      paddingLeft: dynamicSize(15),
      marginTop: dynamicSize(-2),
      fontSize: dynamicSize(12),
      fontWeight: '400',
      textAlign: 'left',
      color: 'red',
      alignSelf: 'flex-start',
    },
    heartIcon: {
      alignSelf: 'center',
      marginVertical: dynamicSize(10),
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.inputText}>
          {items?.find(item => item?.id === inputValue?.[keyName])?.nome ||
            'Escolha uma opção'}
        </Text>
        <MaterialCommunityIcons
          name="chevron-down"
          size={dynamicSize(24)}
          color={color || Colors.purple}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
      <Text style={styles.textError}>{inputValue?.error?.[keyName] || ''}</Text>

      {isModalVisible && (
        <Modal
          transparent
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <FlatList
                data={items}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => String(index)}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => handleSelect(item)}>
                    <Text style={styles.itemText}>{item.nome}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};
