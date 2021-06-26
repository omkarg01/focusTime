import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-native-paper';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { Focus } from './src/features/focus/Focus';
import FocusHistory from './src/features/focus/FocusHistory';
import Timer from './src/features/timer/Timer';

const STATUS = {
  COMPLETE: 1,
  INCOMPLETE: 0,
};
const App = () => {
  console.log("Hello");
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithState = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status }]);
  };

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          style={styles.title}
          title={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUS.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUS.INCOMPLETE);
            setFocusSubject(null);
          }}></Timer>
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory
            focusHistory={focusHistory}
            setFocusHistory={setFocusHistory}
            onClear={() => setFocusHistory([])}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#140369',
  },

  title: {
    color: 'white',
  },
});

export default App;
