import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const CustomSwitch = ({ value, onValueChange }) => {
    return (
      <View style={styles.switchContainer}>
        <Switch
          value={value}
          onValueChange={onValueChange}
          thumbColor="transparent" // Make the default thumb transparent
          ios_backgroundColor="transparent" // Make the default track transparent
        />
        <View style={[styles.thumb, { backgroundColor: value ? '#007bff' : '#dddddd' }]}>
          <Icon name={value ? 'moon' : 'sunny'} size={24} color="#FFFFFF" />
        </View>
      </View>
    );
  };

const NavBar = () => {
  const [isNightMode, setIsNightMode] = useState(true);

  const toggleNightMode = () => {
    setIsNightMode(previousState => !previousState);
   // onChange(!previousState);
  };

  return (
    <View style={[styles.navBar, isNightMode ? styles.nightMode : styles.dayMode]}>
      <Text style={styles.navTitle}>Smart Energy Meter</Text>
     
     <View style={{    flexDirection: 'row',justifyContent: 'space-between', alignItems:'center'}}>

     <Icon name={isNightMode ? 'moon' : 'sunny'} size={24} color= {isNightMode ? '#FFFFFF' : '#000000'}  />
      <Switch value={isNightMode} onValueChange={toggleNightMode} 
     thumbColor={isNightMode ? '#FFFFFF' : '#000000'} // Color of the switch button (thumb)
    trackColor={{ false: '#767577', true: 'white' }} // Color of the switch track when "off" and "on"
        
      />
     </View>
  
    
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    marginTop:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  dayMode: {
    backgroundColor: 'green', // Day mode background color
    color: '#FFFFFF', // Day mode text color
  },
  nightMode: {
    backgroundColor: 'green', // Night mode background color
    color: '#FFFFFF', // Night mode text color
  },
  navTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'white'
  },

});

export default NavBar;
