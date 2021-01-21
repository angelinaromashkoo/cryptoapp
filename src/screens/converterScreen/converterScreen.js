import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getCurrencies, getUpdatedCoinsList} from '../../actions/actions';
import {connect} from 'react-redux';

const cryptoToRemove = [
  'btc',
  'eth',
  'ltc',
  'bch',
  'bnb',
  'eos',
  'xrp',
  'xlm',
  'link',
  'dot',
  'yfi',
];

const ConverterScreen = ({
  getUpdatedCoinsList,
  getCurrencies,
  updatedCoinsList,
  currenciesList,
  loadingUpdate,
}) => {
  const [coinCost, setCoinCost] = useState('');
  const [currency, setCurrency] = useState('');
  const [enteredCoins, setEnteredCoins] = useState('');
  const [enteredCurrencyValue, setEnteredCurrencyValue] = useState('');

  useEffect(() => {
    getUpdatedCoinsList('usd');
    getCurrencies();
  }, [getUpdatedCoinsList, getCurrencies]);

  const filteredCurrencies = () => {
    return currenciesList.filter((item) => {
      return !cryptoToRemove.includes(item);
    });
  };

  const currencyPickerRender = useCallback(
    () => (
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.firstPicker}
          itemStyle={styles.pickerItems}
          selectedValue={coinCost}
          onValueChange={(value) => setCoinCost(value)}>
          <Picker.Item label="Please select coin" value="0" />
          {updatedCoinsList.map((item, index) => {
            return (
              <Picker.Item
                label={item.name}
                value={item.current_price}
                key={index}
              />
            );
          })}
        </Picker>
      </View>
    ),
    [coinCost, updatedCoinsList],
  );

  const renderConverter = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: 10}}
        keyboardShouldPersistTaps="handled">
        {currencyPickerRender()}
        <View style={styles.textInputContainer}>
          <View style={styles.firstInputContainer}>
            <TextInput
              onChangeText={(value) => {
                setEnteredCoins(value);
                setEnteredCurrencyValue(value * coinCost);
              }}
              value={enteredCoins.toString()}
              keyboardType="number-pad"
              style={styles.textInputStyle}
            />
          </View>
          <View style={styles.iconContainer}>
            <Ionicons name="arrow-down-outline" size={25} />
            <Ionicons name="arrow-up-outline" size={25} />
          </View>
          <View style={styles.secondInputContainer}>
            <TextInput
              onChangeText={(value) => {
                setEnteredCurrencyValue(value);
                setEnteredCoins(value / coinCost);
              }}
              value={enteredCurrencyValue.toString()}
              keyboardType="number-pad"
              style={styles.textInputStyle}
            />
          </View>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.secondPicker}
            itemStyle={styles.pickerItems}
            selectedValue={currency}
            onValueChange={(itemValue) => {
              setEnteredCurrencyValue('');
              setEnteredCoins('');
              setCurrency(itemValue);
              getUpdatedCoinsList(itemValue);
            }}>
            {filteredCurrencies().map((item, index) => (
              <Picker.Item
                label={item.toUpperCase()}
                value={item}
                key={index}
              />
            ))}
          </Picker>
          {loadingUpdate && <Text style={styles.loaderStyle}>Loading...</Text>}
        </View>
      </ScrollView>
    );
  };

  return (
    <>
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {renderConverter()}
        </KeyboardAvoidingView>
      ) : (
        renderConverter()
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 21,
  },
  pickerContainer: {
    flex: 1,
    alignSelf: 'center',
  },
  textInputContainer: {
    flex: 1,
  },
  firstInputContainer: {
    flex: 1,
    paddingBottom: 25,
    paddingHorizontal: 25,
    flexGrow: 1,
    justifyContent: 'center',
  },
  secondInputContainer: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 25,
    flexGrow: 1,
    justifyContent: 'center',
  },
  textInputStyle: {
    padding: 15,
    fontSize: 16,
    backgroundColor: 'grey',
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  firstPicker: {
    width: 200,
    height: 88,
  },
  secondPicker: {
    width: 200,
    height: 88,
  },
  pickerItems: {
    height: 88,
  },
  loaderStyle: {
    alignSelf: 'center',
  },
});

const mapStateToProps = ({
  updatedCoinsList,
  currenciesList,
  loadingCurrencies,
  loadingUpdate,
}) => {
  return {
    updatedCoinsList,
    currenciesList,
    loadingCurrencies,
    loadingUpdate,
  };
};

export default connect(mapStateToProps, {getUpdatedCoinsList, getCurrencies})(
  ConverterScreen,
);
