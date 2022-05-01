import React, { FunctionComponent } from 'react';
import { Text, useColorScheme } from 'react-native';

import { PressableText, PressableTextProps } from './PressableText';

export const PressableThemeText: FunctionComponent<PressableTextProps> = (props) => {
  const colorScheme = useColorScheme();
  const color = colorScheme === 'light' ? '#000' : '#fff';

  return <PressableText {...props} style={[props.style, { color }]} />;
};
