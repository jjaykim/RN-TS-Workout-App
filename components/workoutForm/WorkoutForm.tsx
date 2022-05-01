import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { PressableText } from '../Styled/PressableText';

export type WorkoutFormType = {
  name: string;
};

interface WorkoutFormProps {
  onSubmit: (Form: WorkoutFormType) => void;
}

export const WorkoutForm: FunctionComponent<WorkoutFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
  });

  const onChangeText = (name: string) => (text: string) => {
    setForm({
      ...form,
      [name]: text,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={form.name}
        style={styles.input}
        onChangeText={onChangeText('name')}
        placeholder="Workout name"
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
        returnKeyType="done"
      />

      <PressableText
        style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center' }}
        text="Confirm"
        onPress={() => {
          onSubmit(form);
          setForm({ name: '' });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: 200,
  },
});
