import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import RoundedButton from '../../components/RoundedButton';

export const Focus = ({ addSubject }) => {
  const [tempText, setTempText] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          What would you like to focus on?
        </Text>
        <View
          style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
          <View style={styles.inputContainer}>
            <TextInput
              style={{
                fontSize: 20,
                paddingLeft: 7,
                height: 40,
              }}
              onSubmitEditing={(event) => {
                setTempText(event.nativeEvent.text);
              }}
            />
          </View>
          <RoundedButton
            style={{ title: '+', size: 40 }}
            onPressing={() => {
              addSubject(tempText);
            }}></RoundedButton>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent : "center"
  },
  titleContainer: {
    flex: 0.5,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    // flex: 1,
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: 'white',
  },
});
