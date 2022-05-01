import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useCachedResources } from './hooks/useCachedResources';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Navigation } from './navigation';

export default function App() {
  const isLoaded = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoaded) return null;
  return (
    <>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style="auto" />
      </SafeAreaProvider>
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

// NOTE:
// EAS Build - is a hosted service for building app binaries

// IOS Deployment
// https://medium.com/nerd-for-tech/your-guide-to-testing-your-expo-react-native-application-on-ios-abbde4086d08
// https://docs.expo.dev/classic/building-standalone-apps/?redirected
