import {Colors, dynamicSize, sizeScreen} from '@/src/config';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  containerImage: {
    alignSelf: 'center',
    height: sizeScreen.height * 0.5,
    width: sizeScreen.width,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  containerTable: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  titleText: {
    fontSize: dynamicSize(24),
    fontFamily: 'Poppins-Bold',
    fontWeight: '400',
    textAlign: 'left',
    marginBottom: dynamicSize(10),
    color: Colors.white,
  },
  subTitleText: {
    fontSize: dynamicSize(14),
    textAlign: 'left',
    color: Colors.gray,
    fontFamily: 'Poppins-Medium',
    marginBottom: dynamicSize(10),
  },
  containerCode: {
    padding: dynamicSize(30),
  },
});
