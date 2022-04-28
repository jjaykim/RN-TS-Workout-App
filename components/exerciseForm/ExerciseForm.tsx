import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { PressableText } from '../Styled/PressableText';

export type ExerciseFormType = {
  name: string;
  duration: string;
  type: string;
  reps?: string;
};

interface ExerciseFormProps {
  onSubmit: (Form: ExerciseFormType) => void;
}

const selectionItems = ['exercise', 'break', 'stretch'];

export const ExerciseForm: FunctionComponent<ExerciseFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    duration: '',
    type: '',
    reps: '',
  });
  const [isSelectionOn, setIsSelectionOn] = useState(false);

  const onChangeText = (name: string) => (text: string) => {
    setForm({
      ...form,
      [name]: text,
    });
  };

  return (
    <View style={styles.container}>
      <Text>Exercise Form</Text>

      <View>
        <TextInput
          value={form.name}
          style={styles.input}
          onChangeText={onChangeText('name')}
          placeholder="Name"
          returnKeyType="next"
        />

        <TextInput
          value={form.duration}
          style={styles.input}
          onChangeText={onChangeText('duration')}
          placeholder="Duration"
          returnKeyType="next"
        />

        <TextInput
          value={form.reps}
          style={styles.input}
          onChangeText={onChangeText('reps')}
          placeholder="Repetitions"
          returnKeyType="next"
        />

        <View>
          {isSelectionOn ? (
            <View>
              {selectionItems.map((selection) => (
                <PressableText
                  key={selection}
                  text={selection}
                  style={styles.selection}
                  onPressIn={() => {
                    onChangeText('type')(selection);
                    setIsSelectionOn(false);
                  }}
                />
              ))}
            </View>
          ) : (
            <TextInput
              value={form.type}
              onPressIn={() => setIsSelectionOn(true)}
              style={styles.input}
              placeholder="Type"
            />
          )}
        </View>

        <PressableText
          text="Submit"
          onPress={() => {
            onSubmit(form);
            setForm({ name: '', duration: '', type: '', reps: '' });
          }}
        />
      </View>
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
  },
  selection: {
    margin: 2,
    padding: 3,
    alignSelf: 'center',
  },
});
