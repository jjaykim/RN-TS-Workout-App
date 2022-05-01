import { containsKey, getData, removeItem, storeData } from '.';
import data from '../data.json';
import { Workout } from '../types/data';

export const getWorkouts = async (): Promise<Workout[]> => {
  const workouts = await getData('workout-data');

  return workouts;
};

export const getWorkoutBySlug = async (slug: string): Promise<Workout> => {
  const workouts = await getWorkouts();
  const workout = workouts.filter((_workout) => _workout.slug === slug)[0];

  return workout;
};

export const initWorkouts = async (): Promise<boolean> => {
  const hasWokrouts = await containsKey('workout-data');

  if (!hasWokrouts) {
    await storeData('workout-data', data);
    return true;
  }

  return false;
};

export const storeWorkout = async (newWorkout: Workout): Promise<boolean> => {
  const workouts = await getWorkouts();
  await storeData('workout-data', [newWorkout, ...workouts]);

  return true;
};

export const clearWorkouts = async () => {
  await removeItem('workout-data');
};
