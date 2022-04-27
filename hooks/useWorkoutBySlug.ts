import { getWorkoutBySlug } from './../storage/workout';
import { useEffect, useState } from 'react';
import { getWorkouts } from '../storage/workout';
import { Workout } from '../types/data';

export const useWorkoutBySlug = (slug: string) => {
  const [workout, setWorkout] = useState<Workout>();

  useEffect(() => {
    const getData = async () => {
      const _workout = await getWorkoutBySlug(slug);
      setWorkout(_workout);
    };

    getData();
  }, []);

  return workout;
};
