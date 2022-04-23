import React, { FunctionComponent } from 'react';
import { Text, StyleSheet } from 'react-native';

// props 와 children 넘겨주는 방법

export const AksharText: FunctionComponent<Text['props']> = (props) => {
  console.log(props);
  return <Text {...props} style={[props.style, styles.text]} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Akshar',
    fontSize: 40,
  },
});
