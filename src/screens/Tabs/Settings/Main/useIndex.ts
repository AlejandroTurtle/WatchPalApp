import {profileContext} from '@/src/context/profileContext';
import {cleanAllItemAsync} from '@/src/libs/AsyncStorage';
import {deleteToken} from '@/src/libs/Firebase/messaging';
import {PropsScreen} from '@/src/types/Navigation';

export const useIndex = ({navigation, route}: PropsScreen) => {
  const {removeProfile} = profileContext();

  const logout = () => {
    deleteToken();
    removeProfile();
    setTimeout(() => {
      navigation.reset({index: 0, routes: [{name: 'AuthStack'}]});
    }, 0);
  };
  return {logout};
};
