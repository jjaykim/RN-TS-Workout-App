import React, { FunctionComponent } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

import data from '../data.json';
import { Workout } from '../types/data';
import { WorkoutItem } from '../components/workoutItem/WorkoutItem';
// import { AksharText } from '../components/Styled/AksharText';

interface HomeScreenProps {
  navigation: NativeStackHeaderProps;
}

export const HomeScreen: FunctionComponent<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>New Work Out</Text>

      {/* <AksharText style={{ color: '#bcbf24', marginBottom: 10 }} onPress={() => console.log('hi')}>
        Hi
        <Button title="Bye" onPress={() => console.log('bye')} />
        <Text style={{ color: 'red', fontSize: 30 }}>Press</Text>
      </AksharText> */}

      <FlatList data={data as Workout[]} renderItem={WorkoutItem} keyExtractor={(item) => item.slug} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
});
