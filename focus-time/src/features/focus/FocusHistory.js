import React, { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from 'react-native';
import RoundedButton from '../../components/RoundedButton';

const Item = ({ item }) => (
  <Text style={styles(item.status).item}>{item.subject}</Text>
);

const FocusHistory = ({ focusHistory, onClear, setFocusHistory }) => {
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('focusHistory');
      if (jsonValue && JSON.parse(jsonValue).length){
        setFocusHistory(JSON.parse(jsonValue))
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    storeData();
  }, [focusHistory]);

  console.log(focusHistory);
  return (
    <SafeAreaView style={styles().container}>
      {focusHistory.length > 0 && (
        <>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ flex: 1 }}
            data={focusHistory}
            renderItem={Item}
          />
          <View style={{ marginBottom: 20 }}>
            <RoundedButton
              style={{ title: 'Clear', size: 60 }}
              onPressing={() => onClear()}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = (status = null) =>
  StyleSheet.create({
    item: {
      color: status === 0 ? 'red' : 'green',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyItems: 'center',
    },
  });

export default FocusHistory;
