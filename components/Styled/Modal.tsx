import React, { FunctionComponent, useState } from 'react';
import { View, Text, StyleSheet, Modal as DefaultModal } from 'react-native';

import { PressableText } from './PressableText';

interface ModalProps {
  activator?: FunctionComponent<{
    hadndleOpen: () => void;
  }>;
  children: React.ReactNode;
}

export const Modal: FunctionComponent<ModalProps> = ({
  activator: Activator,
  children,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <DefaultModal visible={isModalVisible} transparent={false} animationType="slide">
        <View style={styles.centerView}>
          <View style={styles.contentView}>{children}</View>

          <PressableText onPress={() => setModalVisible(false)} text="CLOSE" />
        </View>
      </DefaultModal>

      {Activator ? (
        <Activator hadndleOpen={() => setModalVisible(true)} />
      ) : (
        <PressableText
          onPress={() => setModalVisible(true)}
          text="OPEN Not using handleOpen"
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentView: {
    marginBottom: 20,
  },
});
