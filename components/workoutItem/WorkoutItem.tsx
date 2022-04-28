import React, { FunctionComponent } from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Workout } from '../../types/data';
import { formatSec, secToMin } from '../../utils/time';

interface WorkoutItemProps {
  item: Workout;
  children?: React.ReactNode;
  childStyles?: StyleProp<ViewStyle>;
}

export const WorkoutItem: FunctionComponent<WorkoutItemProps> = ({
  item,
  children,
  childStyles,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.duration}>Duration: {formatSec(item.duration)}</Text>
      <Text style={styles.difficulty}>Difficulty: {item.difficulty}</Text>

      {children && <View style={childStyles}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderColor: 'rgba(0,0,0, 0.1)',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#ffff',
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  duration: {
    fontSize: 15,
  },
  difficulty: {
    fontSize: 15,
  },
});
