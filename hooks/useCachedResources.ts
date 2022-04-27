import { useEffect, useState } from 'react';
import { initWorkouts, getWorkouts } from '../storage/workout';
import * as Font from 'expo-font';

export const useCachedResources = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        await initWorkouts();

        await Font.loadAsync({
          Akshar: require('../assets/font/Akshar-Regular.ttf'),
          'Akshar-bold': require('../assets/font/Akshar-Bold.ttf'),
        });
      } catch (err: any) {
        console.warn(`Error: ${err}`);
      } finally {
        const workouts = await getWorkouts();
        setIsLoading(true);
      }
    };

    loadResourcesAndDataAsync();
  }, []);

  return isLoading;
};
