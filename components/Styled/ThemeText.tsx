import { FunctionComponent } from 'react';
import { Text, useColorScheme } from 'react-native';

export const ThemeText: FunctionComponent<Text['props']> = (props) => {
  const colorScheme = useColorScheme();
  const color = colorScheme === 'light' ? '#000' : '#fff';

  return <Text {...props} style={[props.style, { color }]} />;
};
