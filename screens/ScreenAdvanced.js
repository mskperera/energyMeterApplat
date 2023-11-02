import { StatusBar } from "expo-status-bar";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import GaugeChart from "react-gauge-chart";
import { SafeAreaView } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

import { useState } from "react";
import VoltageMeter from "../components/VoltageMeter";
import CircularMeter from "../components/VoltageMeter";
import LineChartGraph from "../components/LineChart";
import DashCard from "../components/DashCard";
import LineChartRealTime from "../components/LineChartRealTime";
import { useEffect } from "react";
import ConnectionStatus from "../components/ConnectionStatus";
import moment from "moment";

export default function ScreenAdvanced() {


  function* yLabelPowerFact() {
    yield* ['0','0.1', '0.50', '0.75', '1'];
  }

    const yLabelPowerFactorIterator = yLabelPowerFact();

  const [powerFactChart, setPowerFactChart] = useState([200.5,200.4,200.8,199.84,200.1,201.01]);
  const [voltageChart, setVoltageChart] = useState([200.5,200.4,200.8,199.84,200.1,201.01]);
  const [ampChart, setAmpChart] = useState([200.5,200.4,200.8,199.84,200.1,201.01]);

  const [timeStamp, setTimeStamp] = useState(['14:40','14:50','15:00','15:10','15:20','15:30']);

  const [isDeviceOffline, setIsDeviceOffline] = useState(true);


  let currentProperty=null;
  let countlmit=16;


  let currentPropertyCount=0;
  useEffect(() => {
      const interval = setInterval(writeDataToFirebase, 3000);
  
      return () => clearInterval(interval);
    }, []);
  

  const writeDataToFirebase = async () => {
    countlmit++;
    // const firebaseEndpoint = `https://smart-energy-meter-50344-default-rtdb.firebaseio.com/meter_1_data.json?orderBy="$key"&limitToLast=1`;
    const firebaseEndpoint = `https://smart-energy-meter-50344-default-rtdb.firebaseio.com/meter_1_data.json?orderBy="$key"&limitToLast=1`;
    const firebaseConfig = require('../firebase/smart-energy-meter-50344-firebase-adminsdk-jhrle-ad6767e3bf.json'); // Load the config JSON file

// Perform a GET request using fetch
fetch(firebaseEndpoint)
.then(response => {
  if (response.ok) {
    return response.json(); // Convert response to JSON format
  } else {
    throw new Error('Failed to fetch data');
  }
})
.then(data => {

  let timeStamp;


  for (let property in data) {
    if (data.hasOwnProperty(property)) {
      const meterData=data[property];
      console.log('property advanced:',property)

      timeStamp=secondsToTimestamp(meterData.timeStamp);
if(property===currentProperty)
{
  
     if(currentPropertyCount<5){
      currentPropertyCount++;
     }
     else{
      console.log("currentPropertyCount",currentPropertyCount);
      setIsDeviceOffline(true);
     }
    
  return;

}
currentPropertyCount = 0;
  
      console.log(property + ': ' + secondsToTimestamp(meterData.timeStamp));
      currentProperty=property;
      setIsDeviceOffline(false);
    
  

  setTimeStamp(prevArr => {
    const updatedArr = [...prevArr, timeStamp];

    while (updatedArr.length > 6) {
      updatedArr.shift();
    }

    return updatedArr;
  });

  setPowerFactChart(prevArr => {
    const updatedArr = [...prevArr, meterData.PF];

    while (updatedArr.length > 7) {
      updatedArr.shift();
    }

    return updatedArr;
  });

  //setVoltageChart(meterData.voltage);
  setAmpChart(meterData.current)
  console.log('powerFact:',meterData.PF);
}
  }
})
.catch(error => {
  console.error('Error:', error);
});

  };

const secondsToTimestamp=(totalSeconds)=>{
  //const totalSeconds = 1698402330;
const duration = moment.duration(totalSeconds, 'seconds');
const formattedTime = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');

return formattedTime;
}



  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
       {isDeviceOffline &&  <ConnectionStatus backColor="red" title="Offline" iconName="close-circle-outline" />}

<LineChartGraph dataArr={powerFactChart && powerFactChart} labelArr={timeStamp && timeStamp} 
 title="Power Factor" chartFillColor={"56, 139, 253"} />
<LineChartGraph dataArr={voltageChart && voltageChart} labelArr={timeStamp && timeStamp} title="Voltage" chartFillColor={"63, 185, 80"} />
<LineChartGraph dataArr={powerFactChart && powerFactChart} labelArr={timeStamp && timeStamp} title="Amp." chartFillColor={"218, 54, 51"} />

    </ScrollView>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'flex-start', // To align components at the top of the screen
    paddingTop: 20, // Add some space from the top
    backgroundColor: "#171717",
  },
  energyMetersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  energyMeter: {
    flex: 1,
    alignItems: "center",
  },
  energyMeterText: {
    fontSize: 20,
    marginBottom: 10,
    color: "#fff",
  },
  energyMeterDisplay: {
    // width: 160,
    // height: 160,
    // backgroundColor: 'lightgray',
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  energyMeterValue: {
    fontSize: 20,
  },
  table: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tableColumn: {
    flex: 1,
    alignItems: "center",
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  tableDetails: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
    color: "#fff",
  },
  triggerAlert: {
    fontSize: 18,
    marginTop: 20,
    textAlign: "center",
  },
  infoTitle: {
    fontSize: 20,
    marginTop: 40,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#171717",
    //paddingVertical: 20,
  },
});
