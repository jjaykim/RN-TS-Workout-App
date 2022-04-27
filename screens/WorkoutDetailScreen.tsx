import React, { FunctionComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { useWorkoutBySlug } from '../hooks/useWorkoutBySlug';
import { Modal } from '../components/Styled/Modal';
import { PressableText } from '../components/Styled/PressableText';

// NOTE: route에 커스텀 parameter 추가하는 방법
type WorkoutDetailParamList = {
  WorkoutDetail: { slug: string };
};

type WorkoutDetailRouteProp = RouteProp<WorkoutDetailParamList, 'WorkoutDetail'>;

interface WorkoutDetailScreenProps {
  route: WorkoutDetailRouteProp;
}

export const WorkoutDetailScreen: FunctionComponent<WorkoutDetailScreenProps> = ({
  route,
}) => {
  const workout = useWorkoutBySlug(route.params.slug);

  if (!workout) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{workout.name}</Text>

      <Modal
        activator={({ hadndleOpen }) => (
          <PressableText onPress={hadndleOpen} text="Check Sequence" />
        )}
      />

      <Modal />
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
