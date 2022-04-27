import React, { FunctionComponent } from 'react';
import { Pressable, Text, PressableProps } from 'react-native';

// REVIEW: 기존 Props 와 커스텀 Props를 하나의 타입으로 설정

interface PressableTextProps extends PressableProps {
  text: string;
}

export const PressableText: FunctionComponent<PressableTextProps> = (props) => {
  return (
    <Pressable {...props}>
      <Text style={{ textDecorationLine: 'underline' }}>{props.text}</Text>
    </Pressable>
  );
};
