import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItemAsync = async (key: string, value: any) => {
  try {
    const strValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, strValue);
  } catch (error) {
    console.error(error);
  }
};

export const getItemAsync = async (key: string) => {
  try {
    const strValue = await AsyncStorage.getItem(key);
    if (!strValue) {
      return null;
    }
    const parsedValue = JSON.parse(strValue);
    return parsedValue;
  } catch (error) {
    return null;
  }
};

export const cleanItemAsync = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};

export const cleanAllItemAsync = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error(error);
  }
};

export const listAllKeysAsync = async () => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    console.error(error);
  }
};
