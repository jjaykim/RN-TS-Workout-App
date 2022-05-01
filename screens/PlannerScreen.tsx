import React, { FunctionComponent, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import slugify from 'slugify';

import { ExerciseFormType, ExerciseForm } from '../components/exerciseForm/ExerciseForm';
import { SequenceItem, SequenceType, Workout } from '../types/data';
import { ExerciseItem } from '../components/exerciseItem/ExerciseItem';
import { PressableText } from '../components/Styled/PressableText';
import { Modal } from '../components/Styled/Modal';
import { WorkoutForm, WorkoutFormType } from '../components/workoutForm/WorkoutForm';
import { storeWorkout } from '../storage/workout';
import { PressableThemeText } from '../components/Styled/PressableThemeText';

interface PlannerScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

export const PlannerScreen: FunctionComponent<PlannerScreenProps> = ({ navigation }) => {
  const [seqItems, setSeqItems] = useState<SequenceItem[]>([]);

  const handleExerciseFormSubmit = (form: ExerciseFormType) => {
    const sequenceItem: SequenceItem = {
      slug: slugify(form.name + ' ' + Date.now(), { lower: true }),
      name: form.name,
      type: form.type as SequenceType,
      duration: Number(form.duration),
    };

    if (form.reps) sequenceItem.reps = Number(form.reps);

    setSeqItems([...seqItems, sequenceItem]);
  };

  const computeDiff = (exercisesCount: number, workoutDuration: number) => {
    const intensity = workoutDuration / exercisesCount;

    if (intensity <= 60) {
      return 'hard';
    } else if (intensity <= 100) {
      return 'normal';
    } else {
      return 'easy';
    }
  };

  const handleWorkoutSubmit = async (form: WorkoutFormType) => {
    if (seqItems.length > 0) {
      const duration = seqItems.reduce((acc, item) => {
        return acc + item.duration;
      }, 0);

      const workout: Workout = {
        name: form.name,
        slug: slugify(form.name + ' ' + Date.now(), { lower: true }),
        difficulty: computeDiff(seqItems.length, duration),
        sequence: [...seqItems],
        duration,
      };

      await storeWorkout(workout);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={seqItems}
        keyExtractor={(item) => item.slug}
        renderItem={({ item, index }) => (
          <ExerciseItem item={item}>
            <PressableText
              text="Remove"
              onPressIn={() => {
                const items = [...seqItems];

                items.splice(index, 1);

                setSeqItems(items);
              }}
            />
          </ExerciseItem>
        )}
      />

      <ExerciseForm onSubmit={handleExerciseFormSubmit} />

      <View>
        <Modal
          activator={({ handleOpen }) => (
            <PressableThemeText
              style={{ marginTop: 20 }}
              text="Create Workout"
              onPress={handleOpen}
            />
          )}
        >
          {({ handleClose }) => (
            <View>
              <WorkoutForm
                onSubmit={(data) => {
                  handleWorkoutSubmit(data);
                  handleClose();
                  navigation.navigate('Home');
                }}
              />
            </View>
          )}
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
