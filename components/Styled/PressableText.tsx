import React, { FunctionComponent } from 'react';
import { Pressable, Text, PressableProps, TextStyle, StyleProp } from 'react-native';

// REVIEW: 기존 Props 와 커스텀 Props를 하나의 타입으로 설정

export interface PressableTextProps extends PressableProps {
  text: string;
  style?: StyleProp<TextStyle>;
}

export const PressableText: FunctionComponent<PressableTextProps> = (props) => {
  return (
    <Pressable {...props}>
      <Text style={[props.style, { textDecorationLine: 'underline' }]}>{props.text}</Text>
    </Pressable>
  );
};
