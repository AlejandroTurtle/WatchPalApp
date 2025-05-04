//

import {apikeyMaps, Colors, dynamicSize} from '../../config/index';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import WebView from 'react-native-webview';

type Props = {
  longitude?: number;
  latitude?: number;
  endereco?: string;
};
export const CustomMap = ({endereco, longitude, latitude}: Props) => {
  const query = endereco
    ? encodeURIComponent(endereco)
    : `${latitude},${longitude}`; // Encode the address for safe usage in URLs
  const url = `https://www.google.com/maps/embed/v1/place?key=${apikeyMaps}&q=${query}&zoom=16`;
  const width = dynamicSize(340);
  const height = width * (3 / 4);
  const html = `
  <html lang="en">
    <head style="border: 0px; margin: 0px; padding: 0px;">
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </head>
    <body style="border: 0px; margin: 0px; padding: 0px; display: flex; justify-content: center; align-items: center;">
        <iframe width="${width}" height="${height}" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen frameborder="0" src="${url}"/>     
     </body>
    </html>
  `;
  const styles = StyleSheet.create({
    mapContainer: {
      height: height,
      width: '100%',
      marginVertical: dynamicSize(15),
    },
    label: {
      fontSize: dynamicSize(16),
      color: Colors.black,
      marginTop: dynamicSize(10),
      fontFamily: 'Poppins-Bold',
      marginLeft: dynamicSize(15),
    },
    map: {
      width: '100%',
      minWidth: '100%',
      alignSelf: 'center',
    },
  });

  return (
    <>
      <Text style={styles.label}>Local do Evento:</Text>
      <View style={[styles.mapContainer]}>
        <WebView
          source={{html}}
          allowsFullscreenVideo={true}
          startInLoadingState={true}
          style={styles.map}
          onError={erro => console.error(erro)}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
        />
      </View>
    </>
  );
};
