import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashCard = ({ title,value,mesurement,color="white",progressColor="white",progressValue,backColor }) => {
  
  //const progress = 50// Calculate the progress based on the value
  
const styles = StyleSheet.create({
  // card: {
  //   backgroundColor: '#1c1c1c',
  //   borderRadius: 10,
  //   padding: 20,
  //   alignItems: 'left',
  //   justifyContent: 'left',
  //   margin:10,
  //   width:'50%',
  //   borderColor: 'white',
  //   borderWidth: 1,
  //   opacity:0.5
  // },
  card: {
    width: '50%',
    margin: 5,
  },
  border: {
    backgroundColor: backColor, // Opacity can be adjusted in the fourth parameter (0.3 for 30% opacity)
       borderColor: 'rgba(255, 255, 255, 0.3)',
     borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 20,
    color,
    fontWeight:'500'
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop:5
  },
  valueText: {
    fontSize: 22,
    marginRight: 5,
    color,
  },
  smallText: {
    fontSize: 18,
    alignSelf: 'flex-start',
    color,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginTop:5,
    backgroundColor: progressColor, // Progress bar color
    width: `${progressValue}%`,
    opacity:1
  },
});

  return (
    <View style={styles.card}>
          <View style={styles.border}>
          <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.valueText}>{value}</Text>
        <Text style={[styles.valueText, styles.smallText]}>{mesurement}</Text>
      </View>
     {progressValue && <View style={styles.progressBar} />}
   </View>
   </View>
    </View>
  );
};


export default DashCard;
