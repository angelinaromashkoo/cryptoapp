import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export const CoinDetailHeader = ({
  icon,
  title,
  amountTextStyle,
  amountPrice,
  purchaseDate,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={{uri: icon}}
          style={styles.banner}
          resizeMode="contain"
        />
      </View>
      <View style={styles.description}>
        <Text style={styles.title}>{title}</Text>
        <Text style={amountTextStyle} numberOfLines={1}>
          {`USD ${amountPrice}`}
        </Text>
        <Text style={styles.dateText}>{`Last update: ${purchaseDate}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  iconContainer: {
    paddingTop: 10,
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
  description: {
    marginTop: 15,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  descriptionText: {
    paddingTop: 15,
    textAlign: 'center',
  },
  banner: {
    width: 120,
    height: 120,
  },
  dateText: {
    color: '#FA6428',
    paddingBottom: 30,
  },
});
