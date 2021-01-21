import React, {useEffect, useCallback, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {getSimpleListCoins} from '../../actions/actions';
import {SearchBar} from '../common/searchBar';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MainScreen = ({navigation, getSimpleListCoins, coinsList}) => {
  useEffect(() => {
    getSimpleListCoins('usd');
  }, [getSimpleListCoins]);

  const [search, setSearch] = useState('');
  const [alphabetical, setAlphabetical] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const alphabeticalFilter = (list) => {
    return list.sort((a, b) => a.name.localeCompare(b.name));
  };

  const filterList = (list) => {
    const filteredData = list.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()),
    );
    return alphabetical ? alphabeticalFilter(filteredData) : filteredData;
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    getSimpleListCoins('usd').finally(() => setIsRefreshing(false));
  };

  const renderItem = useCallback(({item}) => {
    const colorChange =
      item.price_change_24h < 0 ? {color: 'red'} : {color: 'green'};
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('MainDetails', {itemId: item.id})}>
        <View style={styles.itemContainerStyle}>
          <View style={styles.itemStyle}>
            <View style={styles.infoContainer}>
              <Image style={styles.image} source={{uri: item.image}} />
              <View style={styles.itemsDirection}>
                <Text style={styles.textItemStyle}>{item.name}</Text>
                <Text style={styles.priceStyle}>
                  Price: {item.current_price?.toFixed(2)}$
                </Text>
                <View style={styles.changeContainer}>
                  <Text style={styles.changeTextStyle}>Change per hour:</Text>
                  <Text style={[colorChange, styles.differenceStyle]}>
                    {item.price_change_24h?.toFixed(2)}$
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.alignStyle}>
              <Ionicons name="chevron-forward-outline" size={20} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  const alphabetData = alphabetical ? alphabeticalFilter(coinsList) : coinsList;
  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          onChangeText={(searchVal) => setSearch(searchVal)}
          onClear={() => setSearch('')}
          value={search}
        />
        <TouchableOpacity
          onPress={() => setAlphabetical(!alphabetical)}
          style={styles.filterStyle}>
          <Ionicons name="funnel-outline" size={30} color="gray" />
        </TouchableOpacity>
      </View>
      <FlatList
        styles={styles.container}
        initialNumToRender={40}
        extraData={coinsList.length}
        onRefresh={() => onRefresh()}
        refreshing={isRefreshing}
        data={search ? filterList(coinsList) : alphabetData}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainerStyle: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f3f3f3',
  },
  itemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  filterStyle: {
    alignSelf: 'center',
    paddingRight: 5,
  },
  textItemStyle: {
    paddingLeft: 15,
    fontSize: 18,
  },
  image: {
    width: 50,
    height: 50,
  },
  itemsDirection: {
    flexDirection: 'column',
  },
  priceStyle: {
    fontSize: 17,
    paddingTop: 5,
    paddingLeft: 15,
  },
  changeContainer: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  changeTextStyle: {
    fontSize: 17,
    paddingLeft: 15,
  },
  differenceStyle: {
    fontSize: 17,
    paddingLeft: 5,
  },
  alignStyle: {
    alignSelf: 'center',
  },
});

const mapStateToProps = ({coinsList}) => {
  return {
    coinsList,
  };
};

export default connect(mapStateToProps, {getSimpleListCoins})(MainScreen);
