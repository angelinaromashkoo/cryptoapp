import React, {useCallback} from 'react';
import {Text, View, Image, StyleSheet, SectionList} from 'react-native';
import {ExternalLink} from '../common/externalLink';
import {aboutMeData} from './infoData';

export const InfoScreen = () => {
  const renderHeader = () => (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={require('../../images/myphoto.jpg')}
          style={styles.photo}
          resizeMode="cover"
          borderRadius={200}
        />
      </View>
      <View style={styles.description}>
        <Text style={styles.name} numberOfLines={1}>
          Angelina Romashko
        </Text>
        <Text style={styles.descriptionText} numberOfLines={1}>
          React Native Developer
        </Text>
      </View>
    </View>
  );

  const renderSectionHeader = ({section}) => {
    return (
      <View style={styles.headerStyle}>
        <Text style={styles.fontSize16}>{section.title}</Text>
      </View>
    );
  };

  const renderTouchableLink = (item) => {
    return (
      <View style={[styles.itemContainerStyle, styles.linkSeparator]}>
        <Text style={styles.fontSize16}>{item.title}</Text>
        <ExternalLink url={item.data}>Press here to visit</ExternalLink>
      </View>
    );
  };

  const renderTextInfo = (item) => {
    return (
      <View style={styles.itemContainerStyle}>
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

  return (
    <View style={styles.container}>
      <SectionList
        sections={aboutMeData}
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
    backgroundColor: 'white',
  },
  iconContainer: {
    paddingTop: 15,
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
  description: {
    marginTop: 15,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  name: {
    fontSize: 25,
  },
  descriptionText: {
    fontSize: 15,
    padding: 15,
  },
  photo: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#FA6428',
  },
  dateText: {
    color: '#FA6428',
    paddingBottom: 30,
  },
  itemContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  linkSeparator: {
    borderBottomWidth: 0.3,
    borderBottomColor: '#ccc',
  },
  headerStyle: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f3f2f2',
  },
  fontSize16: {
    fontSize: 16,
  },
});
