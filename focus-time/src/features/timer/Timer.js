import React, { useState } from 'react';
import { Text, View, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import Countdown from '../../components/Countdown';
import RoundedButton from '../../components/RoundedButton';
import Timing from './Timing';

const DEFAULT_TIME = 0.1;
const Timer = (props) => {
  useKeepAwake();
  const { title, onTimerEnd , clearSubject} = props;
  const [isStart, setIsStart] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStart(false);
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStart(false);
    onTimerEnd();
  };

  return (
    <View style={styles.container}>
      <Countdown
        minutes={minutes}
        isPaused={!isStart}
        onProgress={(progress) => setProgress(progress)}
        onEnd={onEnd}
      />
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.subject}>{title}</Text>
      </View>
      <View style={{ marginBottom: 10 }}>
        <ProgressBar
          progress={progress}
          style={{ height: 10 }}
          color="#e30000"
        />
      </View>
      <Timing addMinute={changeTime}></Timing>
      <View style={{ alignItems: 'center', flex: 0.2 }}>
        {isStart ? (
          <RoundedButton
            style={{ size: 85, title: 'Pause' }}
            onPressing={() => setIsStart(false)}></RoundedButton>
        ) : (
          <RoundedButton
            style={{ size: 85, title: 'Start' }}
            onPressing={() => setIsStart(true)}></RoundedButton>
        )}
      </View>
      <View style = {{ marginLeft: 20 }}>
        <RoundedButton style={{ title: '⇐', size: 60}} onPressing = {()=>(clearSubject())}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  subject: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
});

export default Timer;
