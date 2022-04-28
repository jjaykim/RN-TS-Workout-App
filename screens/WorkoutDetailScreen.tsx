import React, { FunctionComponent, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import { useWorkoutBySlug } from '../hooks/useWorkoutBySlug';
import { Modal } from '../components/Styled/Modal';
import { PressableText } from '../components/Styled/PressableText';
import { formatSec } from '../utils/time';
import { WorkoutItem } from '../components/workoutItem/WorkoutItem';
import { SequenceItem } from '../types/data';
import { useCountDown } from '../hooks/useCountDown';

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
  const [sequence, setSequence] = useState<SequenceItem[]>([]);
  const [trackerIdx, setTractkerIdx] = useState(-1);

  const workout = useWorkoutBySlug(route.params.slug);

  const startupSeq = ['3', '2', '1', 'Go!'].reverse();

  const { countDown, isRunning, stop, start } = useCountDown(trackerIdx);

  useEffect(() => {
    if (!workout) return;

    if (trackerIdx === workout.sequence.length - 1) return;

    if (countDown == 0) addItemToSequence(trackerIdx + 1);
  }, [countDown]);

  const addItemToSequence = (idx: number) => {
    let newSequence = [];

    idx > 0
      ? (newSequence = [...sequence, workout!.sequence[idx]])
      : (newSequence = [workout!.sequence[idx]]);

    setSequence(newSequence);
    setTractkerIdx(idx);
    start(newSequence[idx].duration + startupSeq.length);
  };

  if (!workout) return null;

  const hasReachedEnd = sequence.length === workout.sequence.length && countDown === 0;

  return (
    <View style={styles.container}>
      <WorkoutItem item={workout} childStyles={{ marginTop: 10 }}>
        <Modal
          activator={({ hadndleOpen }) => (
            <PressableText onPress={hadndleOpen} text="Check Sequence" />
          )}
        >
          <View>
            {workout.sequence.map((si, idx) => (
              <View key={si.slug} style={styles.seqenceItem}>
                <Text>
                  {si.name} | {si.type} | {formatSec(si.duration)}
                </Text>

                {idx !== workout.sequence.length - 1 && (
                  <FontAwesome name="arrow-down" size={20} />
                )}
              </View>
            ))}
          </View>
        </Modal>
      </WorkoutItem>

      <View style={styles.wrapper}>
        <View style={styles.counterUI}>
          <View style={styles.counterItem}>
            {sequence.length === 0 ? (
              <FontAwesome
                name="play-circle-o"
                size={100}
                onPress={() => addItemToSequence(0)}
              />
            ) : isRunning ? (
              <FontAwesome name="stop-circle-o" size={100} onPress={() => stop()} />
            ) : (
              <FontAwesome
                name="play-circle-o"
                size={100}
                onPress={() => {
                  if (hasReachedEnd) {
                    addItemToSequence(0);
                  } else {
                    start(countDown);
                  }
                }}
              />
            )}
          </View>

          {sequence.length > 0 && countDown >= 0 && (
            <View style={styles.counterItem}>
              <Text style={{ fontSize: 40 }}>
                {countDown > sequence[trackerIdx].duration
                  ? startupSeq[countDown - sequence[trackerIdx].duration - 1]
                  : countDown}
              </Text>
            </View>
          )}
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 60, fontWeight: '600' }}>
            {sequence.length === 0
              ? 'Prepare'
              : hasReachedEnd
              ? 'Great Job!'
              : sequence[trackerIdx].name}
          </Text>
        </View>
      </View>
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
  seqenceItem: {
    alignItems: 'center',
  },
  counterUI: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 20,
  },
  counterItem: {
    flex: 1,
    alignItems: 'center',
  },
  wrapper: {
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 10,
  },
});
