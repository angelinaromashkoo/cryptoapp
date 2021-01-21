import React, {useEffect, useCallback} from 'react';
import {Text, View, SectionList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {getCoinDetails} from '../../actions/actions';
import {CoinDetailHeader} from '../common/coinDetailHeader';
import {ExternalLink} from '../common/externalLink';

const MainScreenDetails = ({
  getCoinDetails,
  route,
  coinDetails,
  loadingDetails,
}) => {
  useEffect(() => {
    const {itemId} = route.params;
    getCoinDetails(itemId);
  }, [getCoinDetails, route.params]);

  const groupListData = () => {
    const data = [];

    if (coinDetails.links) {
      data.push({
        title: 'Links:',
        isLink: true,
        data: [
          {
            title: 'Homepage:',
            data: coinDetails.links.homepage,
          },
        ],
      });
    }

    if (coinDetails.market_data) {
      data.push({
        title: 'Price changes:',
        isLink: false,
        data: [
          {
            title: 'Amount 24 hours:',
            data: coinDetails.market_data.price_change_24h || '-',
          },
          {
            title: 'Percentage 24 hours:',
            data: coinDetails.market_data.price_change_percentage_24h || 0,
          },
          {
            title: 'Percentage 7 days:',
            data: coinDetails.market_data.price_change_percentage_7d || 0,
          },
          {
            title: 'Percentage 14 days:',
            data: coinDetails.market_data.price_change_percentage_14d || 0,
          },
          {
            title: 'Percentage 30 days:',
            data: coinDetails.market_data.price_change_percentage_30d || 0,
          },
          {
            title: 'Percentage 60 days:',
            data: coinDetails.market_data.price_change_percentage_60d || 0,
          },
          {
            title: 'Percentage 200 days:',
            data: coinDetails.market_data.price_change_percentage_200d || 0,
          },
          {
            title: 'Percentage 1 year:',
            data: coinDetails.market_data.price_change_percentage_1y || 0,
          },
        ],
      });
    }

    if (coinDetails.community_data) {
      data.push({
        title: 'Community activity:',
        isLink: false,
        data: [
          {
            title: 'Facebook likes:',
            data: coinDetails.community_data.facebook_likes || 0,
          },
          {
            title: 'Twitter Followers:',
            data: coinDetails.community_data.twitter_followers || 0,
          },
          {
            title: 'Reddit subscribers:',
            data: coinDetails.community_data.reddit_subscribers || 0,
          },
          {
            title: 'Telegram users:',
            data: coinDetails.community_data.telegram_channel_user_count || 0,
          },
        ],
      });
    }

    data.push({
      title: 'Ico data:',
      isLink: false,
      data: [
        {
          title: 'Genesis date:',
          data: coinDetails.genesis_date || 'Date is not specified',
        },
        {
          title: 'Up percentage:',
          data: coinDetails.sentiment_votes_up_percentage || 0,
        },
        {
          title: 'Down percentage:',
          data: coinDetails.sentiment_votes_down_percentage || 0,
        },
        {
          title: 'Public sale currency:',
          data: coinDetails.ico_data?.quote_public_sale_currency || 0,
        },
        {
          title: 'Public sale amount:',
          data: coinDetails.ico_data?.quote_public_sale_amount || 0,
        },
      ],
    });

    data.push({
      title: 'Rank and scores:',
      isLink: false,
      data: [
        {
          title: 'Market cap rank:',
          data: coinDetails.market_cap_rank || 0,
        },
        {
          title: 'Coingecko rank:',
          data: coinDetails.coingecko_rank || 0,
        },
        {
          title: 'Coingecko score:',
          data: coinDetails.coingecko_score || 0,
        },
        {
          title: 'Developer score:',
          data: coinDetails.developer_score || 0,
        },
        {
          title: 'Community score:',
          data: coinDetails.community_score || 0,
        },
        {
          title: 'Liquidity score:',
          data: coinDetails.liquidity_score || 0,
        },
        {
          title: 'Public interest score:',
          data: coinDetails.public_interest_score || 0,
        },
      ],
    });

    return data;
  };

  const renderHeader = useCallback(
    () => (
      <CoinDetailHeader
        icon={coinDetails.image.large}
        title={coinDetails.name}
        amountTextStyle={styles.amountTextStyle}
        amountPrice={coinDetails.market_data.current_price.usd}
        purchaseDate={coinDetails.last_updated.slice(0, 10)}
      />
    ),
    [coinDetails],
  );

  const renderSectionHeader = ({section}) => {
    return (
      <View style={styles.sectionHeaderStyle}>
        <Text>{section.title}</Text>
      </View>
    );
  };

  const renderTouchableLink = (item) => {
    return (
      <View style={styles.itemContainerStyle}>
        <Text style={styles.fontSize16}>{item.title}</Text>
        <ExternalLink url={item.data[0]}>Press here to visit</ExternalLink>
      </View>
    );
  };

  const renderTextInfo = (item) => {
    return (
      <View style={styles.itemContainerStyle}>
        <Text style={styles.fontSize16}>{item.title}</Text>
        <Text style={styles.fontSize16}>{item.data}</Text>
      </View>
    );
  };

  const renderItem = useCallback(({item, section}) => {
    if (section.isLink) {
      return renderTouchableLink(item);
    } else {
      return renderTextInfo(item);
    }
  }, []);

  if (loadingDetails) {
    return (
      <View style={styles.loadingContainerStyle}>
        <Text style={styles.loadingTextStyle}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={groupListData()}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  amountTextStyle: {
    fontSize: 45,
  },
  sectionHeaderStyle: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#e2e2e2',
  },
  itemContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#ffffff',
  },
  fontSize16: {
    fontSize: 16,
  },
  loadingContainerStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingTextStyle: {
    alignSelf: 'center',
    fontSize: 35,
  },
});

const mapStateToProps = ({coinDetails, loadingDetails}) => ({
  coinDetails,
  loadingDetails,
});

export default connect(mapStateToProps, {getCoinDetails})(MainScreenDetails);
