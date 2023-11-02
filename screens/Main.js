import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import CircularMeter from "../components/VoltageMeter";
import LineChartGraph from "../components/LineChart";
import DashCard from "../components/DashCard";
import moment from "moment/moment";
import ConnectionStatus from "../components/ConnectionStatus";
import React from "react";
import { connect } from "react-redux";

const App = ({ mapStateToProps, mapDispatchToProps }) => {
  const styles = StyleSheet.create({
    ...stylesCommon,
    ...styleDayMode,
    ...stylesNightMode,
  });

  const propstyles = {
    ...propsStyleDayMode,
    ...propsStyleNightMode,
  };

  const [firebaseRowData, setFirebaseRowData] = useState(null);
  const [consumptionChart, setConsumptionChart] = useState([
    50, 55, 60, 65, 75, 86,
  ]);
  const [timeStamp, setTimeStamp] = useState([
    "14:40",
    "14:50",
    "15:00",
    "15:10",
    "15:20",
    "15:30",
  ]);

  const [voltage, setVoltage] = useState(0);
  const [current, setCurrent] = useState(0);
  const [watt, setWatt] = useState(0);

  const [bill, setBill] = useState(0);
  const [consumption, setConsumption] = useState(0);

  const [budkgetedValue, setBudkgetedValue] = useState(100000);
  const [totalUnitsForBudget, setTotalUnitsForBudget] = useState(190);
  const [remainingValue, setRemainingValue] = useState(0);

  let currentProperty = null;
  const [isDeviceOffline, setIsDeviceOffline] = useState(true);

  const [consumption_prec, setConsumption_prec] = useState(0);
  const [remaining_prec, setRemaining_prec] = useState(0);

  let countlmit = 16;
  useEffect(() => {
    const _totalUnitsforBudget = getUnitsForBudgetByBudgetedValue(10000);

    setTotalUnitsForBudget(_totalUnitsforBudget);
    setConsumption_prec((consumption / _totalUnitsforBudget) * 100);
    setRemainingValue(totalUnitsForBudget - consumption);
    setRemaining_prec((remainingValue / _totalUnitsforBudget) * 100);

    //for testing calcultation
    getBudgetedValueByUnits(_totalUnitsforBudget);
    const currBillAmount = getBudgetedValueByUnits(consumption);
    console.log("currBillAmount", currBillAmount);
    setBill(currBillAmount);

    // mapDispatchToProps("heellooooooooo")
    // writeDataToFirebase();
    // Call the function to write data on mount
  }, []);

  let currentPropertyCount = 0;
  useEffect(() => {
    const interval = setInterval(writeDataToFirebase, 3000);

    return () => clearInterval(interval);
  }, []);

  const writeDataToFirebase = async () => {
    countlmit++;
    // const firebaseEndpoint = `https://smart-energy-meter-50344-default-rtdb.firebaseio.com/meter_1_data.json?orderBy="$key"&limitToLast=1`;
    const firebaseEndpoint = `https://smart-energy-meter-50344-default-rtdb.firebaseio.com/meter_1_data.json?orderBy="$key"&limitToLast=1`;
    const firebaseConfig = require("../firebase/smart-energy-meter-50344-firebase-adminsdk-jhrle-ad6767e3bf.json"); // Load the config JSON file

    // Perform a GET request using fetch
    fetch(firebaseEndpoint)
      .then((response) => {
        if (response.ok) {
          return response.json(); // Convert response to JSON format
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .then((data) => {
        let timeStamp;
        let consumptionChart;

        for (let property in data) {
          if (data.hasOwnProperty(property)) {
            const meterData = data[property];
            console.log("property", property);

            consumptionChart = meterData.consumption;
            timeStamp = secondsToTimestamp(meterData.timeStamp);
            if (property === currentProperty) {
              if (currentPropertyCount < 5) {
                currentPropertyCount++;
              } else {
                console.log("currentPropertyCount", currentPropertyCount);
                setIsDeviceOffline(true);
                // setVoltage(0);
                /// setCurrent(0);
                /// setBill(0);
                // setWatt(0);
                // setConsumption(0);
              }

              return;
            }
            currentPropertyCount = 0;
            setVoltage(meterData.voltage);
            setCurrent(meterData.current);
            // setBill(meterData.bill);
            setWatt(meterData.power);
            setConsumption(meterData.consumption);
            console.log(
              property + ": " + secondsToTimestamp(meterData.timeStamp)
            );
            console.log("Watt from firbase:", meterData);
            currentProperty = property;
            setIsDeviceOffline(false);
          }
        }

        setTimeStamp((prevArr) => {
          const updatedArr = [...prevArr, timeStamp];

          while (updatedArr.length > 6) {
            updatedArr.shift();
          }

          return updatedArr;
        });

        setConsumptionChart((prevArr) => {
          const updatedArr = [...prevArr, consumptionChart];

          while (updatedArr.length > 6) {
            updatedArr.shift();
          }

          return updatedArr;
        });

        console.log("cccccccccc", consumptionChart);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const secondsToTimestamp = (totalSeconds) => {
    //const totalSeconds = 1698402330;
    const duration = moment.duration(totalSeconds, "seconds");
    const formattedTime = moment
      .utc(duration.asMilliseconds())
      .format("HH:mm:ss");

    return formattedTime;
  };

  const getBudgetedValueByUnits = (units) => {
    let int_energy = units;

    if (int_energy < 31) {
      energy_charge = 10;
      fixed_charge = 150;
    } else if (int_energy > 30 && int_energy < 61) {
      int_energy = int_energy - 30;
      energy_charge = 25;
      fixed_charge = 300 + 300;
    } else if (int_energy > 60 && int_energy < 91) {
      int_energy = int_energy - 60;
      energy_charge = 35;
      fixed_charge = 400 + 1920;
    } else if (int_energy > 90 && int_energy < 121) {
      int_energy = int_energy - 90;
      energy_charge = 50;
      fixed_charge = 1000 + 1920 + 1050;
    } else if (int_energy > 120 && int_energy < 181) {
      int_energy = int_energy - 120;
      energy_charge = 50;
      fixed_charge = 1500 + 1920 + 1050 + 1500;
    } else if (int_energy > 180) {
      int_energy = int_energy - 180;
      energy_charge = 75;
      fixed_charge = 2000 + 1920 + 1050 + 1500 + 3000;
    }
    const bill = int_energy * energy_charge + fixed_charge;

    console.log("getBudgetedValueByUnits", bill);
    return bill;
  };
  const getUnitsForBudgetByBudgetedValue = (budkgetedValue) => {
    // Given bill amount
    let bill = budkgetedValue;

    // Initialize variables for int_energy and energy_charge
    let int_energy = 0;
    let energy_charge = 0;

    // Reverse calculation to find int_energy from the bill amount
    if (bill >= 10420) {
      int_energy = (bill - 10420) / 75 + 180;
      energy_charge = 75;
    } else if (bill >= 7420) {
      int_energy = (bill - 7420) / 50 + 120;
      energy_charge = 50;
    } else if (bill >= 5020) {
      int_energy = (bill - 5020) / 50 + 90;
      energy_charge = 50;
    } else if (bill >= 3010) {
      int_energy = (bill - 3010) / 35 + 60;
      energy_charge = 35;
    } else if (bill >= 1530) {
      int_energy = (bill - 1530) / 25 + 30;
      energy_charge = 25;
    } else {
      int_energy = bill / 10;
      energy_charge = 10;
    }

    // Displaying the calculated int_energy
    console.log("The int_energy is: ", int_energy);

    return int_energy;
  };
  const [energyValue, setEnergyValue] = useState(0);
  const threshold = 50; // Change this value as per your requirement
  //const db = useDatabase(); // Get the database instance

  const voltageValue = 120; // Replace this with the actual voltage value
  const wattsValue = 450; // Replace this with the actual watts value
  const [progressValue, setProgressValue] = useState(210);

  const increaseValue = () => {
    if (progressValue === 200) {
      setProgressValue(0);
    }
    setProgressValue(progressValue + 30); // Increase the value by 10
  };

  const [labelArr, setLabelArr] = useState([]);
  const [dataArr, setDataArr] = useState([0, 1, 4, 6, 7, 2]);
  //const dataArr=[0.1,30];

  const [dashCardBudgetedTextColor, setDashCardBudgetedTextColor] =
    useState("green");

  const triggerData = () => {
    const currentTime = moment();
    const formattedTime = currentTime.format("HH:mm:ss");

    setLabelArr((prevArr) => {
      const updatedArr = [...prevArr, formattedTime];

      while (updatedArr.length > 6) {
        updatedArr.shift();
      }

      return updatedArr;
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {isDeviceOffline && (
          <ConnectionStatus
            backColor="red"
            title="Offline"
            iconName="close-circle-outline"
          />
        )}

        <View style={{ paddingTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
            }}
          >
            <DashCard
              title="Budgeted"
              value="10,000.00"
              mesurement="Rs"
              color={propstyles.dashCard.color}
              backColor={propstyles.dashCard.backColor}
              style={{ flex: 1 }}
            />
            <DashCard
              title="Usage"
              value={bill.toFixed(2)}
              mesurement="Rs"
              color={propstyles.dashCard.color}
              backColor={propstyles.dashCard.backColor}
              style={{ flex: 1 }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
            }}
          >
            <DashCard
              title={"Consumed"}
              // title={consumption_prec.toFixed(2)}
              value={`${consumption}/${totalUnitsForBudget}`}
              // color={ propstyles.dashCard.color}
              mesurement="Kwh"
              color={propstyles.dashCard.color}
              backColor={propstyles.dashCard.backColor}
              style={{ flex: 1 }}
              progressValue={consumption_prec.toFixed(2)}
              progressColor="white"
            />
            <DashCard
              title="Remaning"
              // title={remaining_prec.toFixed(2)}
              value={`${remainingValue}/${totalUnitsForBudget}`}
              mesurement="Kwh"
              color={propstyles.dashCard.color}
              backColor={propstyles.dashCard.backColor}
              style={{ flex: 1 }}
              progressValue={remaining_prec.toFixed(2)}
              progressColor="white"
            />
          </View>
          <View style={styles.energyMetersContainer}>
            <View style={styles.energyMeter}>
              {/* <Text style={styles.energyMeterText}>Voltage</Text> */}
              <View style={styles.energyMeterDisplay}>
                <CircularMeter
                  minLabelValue={0}
                  maxLabelValue={null}
                  maxValue={400}
                  progressValue={voltage}
                  progressValueColor={
                    propstyles.circularMeter.progressValueColor
                  }
                  title="Voltage"
                  strokeColorConfig={[
                    { color: "gray", value: 0 },
                    { color: "yellowgreen", value: 150 },
                    { color: "yellow", value: 230 },
                    { color: "red", value: 300 },
                  ]}
                />
              </View>
            </View>
            <View style={styles.energyMeter}>
              {/* <Text style={styles.energyMeterText}>Current</Text> */}
              <View style={styles.energyMeterDisplay}>
                <CircularMeter
                  minLabelValue={0}
                  maxLabelValue={null}
                  maxValue={50}
                  progressValue={current}
                  progressValueColor={
                    propstyles.circularMeter.progressValueColor
                  }
                  title="Amp"
                  strokeColorConfig={[
                    { color: "yellowgreen", value: 0 },
                    { color: "yellowgreen", value: 100 },
                    { color: "yellow", value: 150 },
                    { color: "red", value: 250 },
                  ]}
                />
              </View>
            </View>
            <View style={styles.energyMeter}>
              {/* <Text style={styles.energyMeterText}>Current</Text> */}
              <View style={styles.energyMeterDisplay}>
                <CircularMeter
                  minLabelValue={0}
                  maxLabelValue={null}
                  maxValue={1500}
                  progressValue={watt > 999.99 ? watt / 1000 : watt}
                  progressValueColor={
                    propstyles.circularMeter.progressValueColor
                  }
                  title={watt > 999.99 ? "kW" : "Watt"}
                  strokeColorConfig={[
                    { color: "yellowgreen", value: 0 },
                    { color: "yellowgreen", value: 100 },
                    { color: "yellowgreen", value: 150 },
                    { color: "yellowgreen", value: 250 },
                  ]}
                />
              </View>
            </View>
          </View>
          <View style={styles.energyMetersContainer}>
           
          </View>
          {/* <View style={{ margin: 0 }}>
          <LineChartRealTime dataArr={dataArr} labelArr={labelArr} title="Kwh" chartFillColor={"255, 255, 255"}  />
        </View>  */}
          <View style={{ margin: 0 }}>
            <LineChartGraph
              dataArr={consumptionChart && consumptionChart}
              labelArr={timeStamp && timeStamp}
              title="Kwh"
              chartFillColor={"255, 255, 255"}
            />
          </View>
          {/* <View style={{ margin: 0 }}>
          <LineChartGraph dataArr={consumptionChart && consumptionChart} labelArr={timeStamp && timeStamp} title="Kwh" chartFillColor={"255, 255, 255"} />
        </View>  */}
          {/* <View style={{ margin: 0 }}>
          <LineChartGraph title="Power" chartFillColor={"56, 139, 253"} />
        </View>
        <View style={{ margin: 0 }}>
          <LineChartGraph title="Voltage" chartFillColor={"63, 185, 80"} />
        </View>
        <View style={{ margin: 10 }}>
          <LineChartGraph title="Current" chartFillColor={"218, 54, 51"} />
        </View> */}
          {/* <View>
          <Button title="Increase Value" onPress={increaseValue} />

          <Text style={styles.infoTitle}>Trigger Alert</Text>
        </View> */}

          {/* <TouchableOpacity onPress={() => SoundPlayer.playSoundFile('alert', 'mp3')}>
    <Text style={styles.triggerAlert}>Trigger Alert</Text>
  </TouchableOpacity> */}
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    someData: state.someData, // Access data from the state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSomeAction: () => dispatch({ type: "CONNECTION_STATUS" }), // Dispatch an action
  };
};

const stylesCommon = {
  energyMetersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  energyMeter: {
    flex: 1,
    alignItems: "center",
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

  triggerAlert: {
    fontSize: 18,
    marginTop: 20,
    textAlign: "center",
  },
};

const stylesNightMode = {
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'flex-start', // To align components at the top of the screen

    backgroundColor: "#171717",
  },

  energyMeterText: {
    fontSize: 20,
    marginBottom: 10,
    color: "#fff",
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
};

const propsStyleNightMode = {
  dashCard: {
    backColor: "rgba(255, 255, 255, 0.05)",
    color: "white",
  },
  circularMeter: {
    progressValueColor: "yellowgreen",
  },
};
const propsStyleDayMode = {
  dashCard: {
    backColor: "#eeeeee",
    color: "#2f2f2f",
  },
  circularMeter: {
    progressValueColor: "#2f2f2f",
  },
};
const styleDayMode = {
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
    backgroundColor: "#fff", // Set background color to white for day mode
  },
  energyMeterText: {
    fontSize: 20,
    marginBottom: 10,
    color: "#000", // Change text color to black for better readability
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000", // Change text color to black for better readability
  },
  tableDetails: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
    color: "#000", // Change text color to black for better readability
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
    backgroundColor: "#fff",
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
