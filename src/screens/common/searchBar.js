import React, {useRef} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const SearchBar = ({onChangeText, onClear, value}) => {
  const inputRef = useRef(null);
  const hitSlop = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  };

  const onClearInput = () => {
    onClear && onClear();
    inputRef.current.blur();
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        autoCorrect={false}
        placeholder="Enter to search"
        value={value}
        style={styles.searchBar}
        onChangeText={onChangeText}
      />
      {!!value && (
        <TouchableOpacity
          hitSlop={hitSlop}
          style={styles.centerIconStyle}
          onPress={onClearInput}>
          <Ionicons name="close-outline" size={30} color="gray" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  searchBar: {
    fontSize: 24,
    padding: 16,
  },
  centerIconStyle: {
    paddingRight: 15,
    alignSelf: 'center',
  },
});
