import * as React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';

export function LogoTitleIcon({title}) {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{title}</Text>
      <Image style={styles.image} source={require('../../images/geckon.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  textStyle: {
    alignSelf: 'center',
    paddingRight: 10,
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  image: {
    width: 30,
    height: 30,
  },
});
