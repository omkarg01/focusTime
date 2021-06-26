import React, { useState } from 'react';
import { ProgressBar } from 'react-native-paper';
import RoundedButton from '../../components/RoundedButton';
import { Text, View, StyleSheet } from 'react-native';

const Timing = (props) => {
  const { addMinute } = props;

  return (
    <View style={styles.contianer}>
      <RoundedButton
        style={{ title: 5, size: 60 }}
        onPressing={() => addMinute(5)}
      />
      <RoundedButton
        style={{ title: 1, size: 60 }}
        onPressing={() => addMinute(1)}
      />
      <RoundedButton
        style={{ title: 20, size: 60 }}
        onPressing={() => addMinute(20)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contianer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default Timing;
