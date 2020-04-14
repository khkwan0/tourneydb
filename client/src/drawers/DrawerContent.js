import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Avatar, Title, Caption, Paragraph} from 'react-native-paper';

class DrawerContent extends Component {
  render() {
    return (
      <DrawerContentScrollView {...this.props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <Avatar.Image
              source={{
                uri:
                  'https://avatars0.githubusercontent.com/u/963657?s=460&u=782efc35a5b43293abb78c891eff9cc510e30004&v=4',
              }}
              size={50}
            />
            <Title style={styles.title}>Ken</Title>
            <Caption style={styles.caption}>@sucks</Caption>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  100
                </Paragraph>
                <Caption style={styles.caption}>Games</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  1
                </Paragraph>
                <Caption style={styles.caption}>Win</Caption>
              </View>
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
    );
  }
}

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingTop: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
});
