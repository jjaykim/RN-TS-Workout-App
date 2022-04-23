import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useCachedResources } from './hooks/useCachedResources';

import { Navigation } from './navigation';

export default function App() {
  const isLoaded = useCachedResources();

  if (!isLoaded) return null;
  return (
    <>
      <Navigation />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
