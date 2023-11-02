import React from 'react';
import { View, Text } from 'react-native';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
import { LineChart } from 'react-native-chart-kit';

const LineChartGraph = ({dataArr,labelArr, progressValue, title, radius,chartFillColor }) => {


  return (
    <View style={{ backgroundColor: '#1c1c1c' }}>
          <View style={{ backgroundColor: '#1c1c1c',  margin: 10 }}>
      <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: 'normal', color: 'white', marginBottom: 10,marginLeft:20 }}>{title}</Text>
      <LineChart
        data={{
          labels:labelArr|| [], // example labels
          datasets: [
            {
              data: dataArr|| [], // example data points
            },
          ],
        }}
        width={screenWidth}
        height={200}
        yAxisLabel=""
        yAxisSuffix=""
       // formatYLabel={(value) => `${value}`} // Modified formatYLabel to display only the value
        chartConfig={{
          backgroundGradientFrom: '#1c1c1c',
          backgroundGradientTo: '#1c1c1c',
          color: (opacity = 1) => `rgba(${chartFillColor}, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: 'white',
          },
          propsForVerticalLabels: {
            fontSize: 12,
            fontWeight: 'bold',
          },
          propsForHorizontalLabels: {
            fontSize: 12,
            fontWeight: 'bold',
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
          marginVertical: 8,
        }}
      />
    </View>
    </View>
  );
};

export default LineChartGraph;

