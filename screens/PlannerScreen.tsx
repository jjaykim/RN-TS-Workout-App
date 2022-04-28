import React, { FunctionComponent, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import slugify from 'slugify';

import { ExerciseFormType, ExerciseForm } from '../components/exerciseForm/ExerciseForm';
import { SequenceItem, SequenceType } from '../types/data';
import { ExerciseItem } from '../components/exerciseItem/ExerciseItem';
import { PressableText } from '../components/Styled/PressableText';

interface PlannerScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

export const PlannerScreen: FunctionComponent<PlannerScreenProps> = ({ navigation }) => {
  const [seqItems, setSeqItems] = useState<SequenceItem[]>([]);

  const handleFormSubmit = (form: ExerciseFormType) => {
    const sequenceItem: SequenceItem = {
      slug: slugify(form.name + ' ' + Date.now(), { lower: true }),
      name: form.name,
      type: form.type as SequenceType,
      duration: Number(form.duration),
    };

    if (form.reps) sequenceItem.reps = Number(form.reps);

    setSeqItems([...seqItems, sequenceItem]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={seqItems}
        keyExtractor={(item) => item.slug}
        renderItem={({ item, index }) => (
          <ExerciseItem item={item}>
            <PressableText
              text="Remove"
              onPressIn={() => {
                const items = [...seqItems];

                items.splice(index, 1);

                setSeqItems(items);
              }}
            />
          </ExerciseItem>
        )}
      />

      <ExerciseForm onSubmit={handleFormSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
