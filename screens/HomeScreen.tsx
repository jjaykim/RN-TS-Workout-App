import React, { FunctionComponent, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';

import { WorkoutItem } from '../components/workoutItem/WorkoutItem';
import { useWorkouts } from '../hooks/useWorkouts';
import { ThemeText } from '../components/Styled/ThemeText';
// import { AksharText } from '../components/Styled/AksharText';

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

export const HomeScreen: FunctionComponent<HomeScreenProps> = ({ navigation }) => {
  const workouts = useWorkouts();

  return (
    <View style={styles.container}>
      <ThemeText style={styles.header}>New Work Out</ThemeText>

      {/*REVIEW: Prop와 Children을 인자로 넘겨주는 연습 */}
      {/* <AksharText style={{ color: '#bcbf24', marginBottom: 10 }} onPress={() => console.log('hi')}>
        Hi
        <Button title="Bye" onPress={() => console.log('bye')} />
        <Text style={{ color: 'red', fontSize: 30 }}>Press</Text>
      </AksharText> */}

      <FlatList
        data={workouts}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => navigation.navigate('WorkoutDetail', { slug: item.slug })}
            >
              <WorkoutItem item={item} />
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.slug}
      />
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
