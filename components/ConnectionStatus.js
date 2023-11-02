
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ConnectionStatus = ({ backColor, title,iconName }) => {
  return (
    <View style={{ ...styles.container, backgroundColor: backColor }}>
      <Text style={styles.navTitle}>
        {title}
        <Icon name={iconName} size={20} color="white" style={styles.iconStyle} />
 
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    margin: 5,
  },
  navTitle: {
    fontSize: 17,
    color: 'white',
    padding: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    marginLeft: 20,
    alignSelf: 'center', // Aligns the icon vertically in the center
  },
});

export default ConnectionStatus;