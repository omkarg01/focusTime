import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';

const minutesToMillis = (minutes) => minutes * 1000 * 60;
function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

const Countdown = (props) => {
  const { isPaused, minutes, onProgress, onEnd } = props;
  const [millies, setMillies] = useState(minutesToMillis(minutes));
  const interval = useRef(null);
  useEffect(() => {
    // console.log(minutes);
    setMillies(minutesToMillis(minutes));
  }, [minutes]);

  const countdown = () => {
    console.log('running');
    setMillies((prevMil) => {
      if (prevMil === 0) {
        clearInterval(interval)
        onEnd();
        return prevMil;
      }
      const timeLeft = prevMil - 1000;
      onProgress(timeLeft / minutesToMillis(minutes));
      return timeLeft;
    });
  };

  useEffect(() => {
    if (isPaused) {
      return;
    }

    interval.current = setInterval(countdown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{millisToMinutesAndSeconds(millies)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    marginHorizontal: 25,
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  timer: {
    color: 'white',
    fontSize: 100,
    fontWeight: 'bold',
  },
});

export default Countdown;
