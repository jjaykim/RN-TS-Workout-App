import React, { FunctionComponent } from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';

interface PlannerScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

export const PlannerScreen: FunctionComponent<PlannerScreenProps> = ({
  navigation,
}) => {
  return (
    <View>
      <Text>I am planner screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};
