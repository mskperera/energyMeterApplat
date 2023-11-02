import React from 'react';
import { View, Text } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

const CircularMeter = ({ progressValue,minLabelValue,maxLabelValue,maxValue, title, radius,strokeColorConfig,progressValueColor }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
      <View style={{ flex: 1, textAlign: 'right',marginBottom:20 }}>
      <Text style={{  color: 'white',textAlign:'right',opacity:0.5  }}> {minLabelValue && minLabelValue}</Text>
      {/* <Text style={{  color: 'white' ,textAlign:'center',opacity:0.5   }}>Min</Text> */}
      </View>
      <View style={{ flex: 3, alignItems: 'center' }}>
        <CircularProgress
          strokeColorConfig={strokeColorConfig}
          dashedStrokeConfig={{
            count: 50,
            width: 4,
          }}
          inActiveStrokeWidth={40}
          activeStrokeWidth={20}
          inActiveStrokeColor={'rgba(0, 0, 0, 0)'}
          inActiveStrokeOpacity={0.5}
          progressValueColor={progressValueColor}
          progressValueFontSize={22}
          rotation={240}
          strokeLinecap='round'
          value={progressValue}
   
          radius={80}
          duration={2000}
          // progressValueColor={'#ecf0f1'}
          maxValue={maxValue}
          title={title}
          titleColor={'white'}
          titleStyle={{ fontWeight: 'normal',fontSize:20,opacity:0.5  }}


          progressFormatter={(value) => {
            'worklet';
              
            return value.toFixed(2); // 2 decimal places
          }}
          
        />
      </View>
      <View style={{ flex: 1, textAlign: 'left',marginBottom:20 }}>
      <Text style={{  color: 'white',textAlign:'left',opacity:0.5 }}> {maxLabelValue && maxLabelValue}</Text>
      {/* <Text style={{  color: 'white' ,textAlign:'center',opacity:0.5 }}>Max</Text> */}
      </View>

    </View>
  );
};

export default CircularMeter;
