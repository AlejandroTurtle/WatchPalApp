import {Colors, dynamicSize, sizeScreen} from 'config';
import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
type Props = {
  mensagem?: string;
};
export const LoadingScreen = ({mensagem}: Props) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );

    pulse.start();
    return () => pulse.stop(); // Clean up the animation loop
  }, []);

  return (
    <View style={styles.container}>
      {/* Pulsating Circle */}
      <Animated.View style={[{transform: [{scale: scaleAnim}]}]}>
        <MaterialCommunityIcons
          name={'heart'}
          color={Colors.newRed}
          size={dynamicSize(180)}
        />
      </Animated.View>
      <View style={styles.containerText}>
        <Text style={styles.text}>{mensagem || 'Carregando...'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: sizeScreen.width,
  },
  containerText: {
    width: '100%',
    marginTop: dynamicSize(20),
    paddingHorizontal: dynamicSize(30),
  },
  text: {
    fontSize: dynamicSize(18),
    fontWeight: '400',
    color: Colors.gray700,
    marginTop: dynamicSize(45),
    textAlign: 'center',
  },
});
