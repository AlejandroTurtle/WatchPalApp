import {profileContext} from '@/src/context/profileContext';
import {deleteToken} from '@/src/libs/Firebase/messaging';
import {PropsScreen} from '@/src/types/Navigation';
import {Linking} from 'react-native';
import Share from 'react-native-share';

export const useIndex = ({navigation, route}: PropsScreen) => {
  const {removeProfile, profile} = profileContext();

  const logout = () => {
    deleteToken();
    removeProfile();

    navigation.reset({index: 0, routes: [{name: 'AuthStack'}]});
  };

  const handleMessageSuporte = async () => {
    Linking.openURL(
      'https://wa.me/5531991599292?text=Ol%C3%A1%2C%20preciso%20de%20ajuda%20com%20o%20WatchPal',
    );
  };

  const handleShare = async () => {
    const shareMessage =
      'Estou usando o WatchPal! Aqui posso adicionar filmes e séries aos favoritos, marcar episódios como assistidos, ver quantos já assisti e quantas horas, além de conferir os filmes em cartaz. Bora maratonar juntos? 📽🍿';

    Share.open({
      message: shareMessage,
    });
  };

  return {logout, handleMessageSuporte, handleShare};
};
