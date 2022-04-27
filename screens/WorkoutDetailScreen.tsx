import React, { FunctionComponent } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { useWorkoutBySlug } from '../hooks/useWorkoutBySlug';
import { PressableText } from '../components/Styled/PressableText';

//TODO: route에 커스텀 parameter 추가하는 방법
//FIXME: route에 커스텀 parameter 추가하는 방법

//MEMO: sdfasdfksjdflk
type WorkoutDetailParamList = {
  WorkoutDetail: { slug: string };
};

type WorkoutDetailRouteProp = RouteProp<
  WorkoutDetailParamList,
  'WorkoutDetail'
>;

interface WorkoutDetailScreenProps {
  route: WorkoutDetailRouteProp;
}

export const WorkoutDetailScreen: FunctionComponent<
  WorkoutDetailScreenProps
> = ({ route }) => {
  const workout = useWorkoutBySlug(route.params.slug);

  if (!workout) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{workout.name}</Text>
      <PressableText
        onPress={() => alert('Opening modal')}
        text="Check Sequence"
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
