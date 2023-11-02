import React from 'react';
import { View, Text } from 'react-native';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
import { LineChart } from 'react-native-chart-kit';

const LineChartGraph = ({dataArr,labelArr, title,chartFillColor,formatYLabel }) => {

  return (
    <View style={{ backgroundColor: '#1c1c1c' }}>
          <View style={{ backgroundColor: '#1c1c1c',  margin: 10 }}>
      <Text style={{ textAlign: 'left', fontSize: 18, fontWeight: 'normal', color: 'white', marginBottom: 10,marginLeft:20 }}>{title}</Text>
      <LineChart
        data={{
          labels:labelArr || [], // example labels
          datasets: [
            {
              data: dataArr|| [], // example data points
            },
          ],
        }}
        width={screenWidth}
        height={180}
    
        formatYLabel={(v) =>formatYLabel ? formatYLabel : v }
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: '#1c1c1c',
          backgroundGradientTo: '#1c1c1c',
          color: (opacity = 1) => `rgba(${chartFillColor}, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: '2',
            strokeWidth: '1',
            stroke: 'white',
          },
        
          propsForVerticalLabels: {
            fontSize: 10,
            // fontWeight: 'bold',
          },
          propsForHorizontalLabels: {
            fontSize: 10,
            // fontWeight: 'bold',
          },
          style: {
            borderRadius: 16,
          },
          propsForBackgroundLines: {
            strokeWidth: 1,
            stroke: 'white',
            opacity:0.2,
            strokeDasharray: [2, 0],
          },
        }}
        bezier={false}
        style={{
          marginVertical: 0,
        }}
      />
    </View>
    </View>
  );
};

export default LineChartGraph;



// <View>
//   <Text>Bezier Line Chart</Text>
//   <LineChart
//     data={{
//       labels: ["January", "February", "March", "April", "May", "June"],
//       datasets: [
//         {
//           data: [
//             Math.random() * 100,
//             Math.random() * 100,
//             Math.random() * 100,
//             Math.random() * 100,
//             Math.random() * 100,
//             Math.random() * 100
//           ]
//         }
//       ]
//     }}
//     width={Dimensions.get("window").width} // from react-native
//     height={220}
//     yAxisLabel="$"
//     yAxisSuffix="k"
//     yAxisInterval={1} // optional, defaults to 1
//     chartConfig={{
//       backgroundColor: "#e26a00",
//       backgroundGradientFrom: "#fb8c00",
//       backgroundGradientTo: "#ffa726",
//       decimalPlaces: 2, // optional, defaults to 2dp
//       color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//       labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//       style: {
//         borderRadius: 16
//       },
//       propsForDots: {
//         r: "6",
//         strokeWidth: "2",
//         stroke: "#ffa726"
//       }
//     }}
//     bezier
//     style={{
//       marginVertical: 8,
//       borderRadius: 16
//     }}
//   />
// </View>
