import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const RoundedButton = (props) => {
  const { title, size, style, textStyle} = props.style;

  return (
    <TouchableOpacity
      style={[styles(size).radius, style]}
      onPress={props.onPressing}>
      <Text style={[styles(size).title, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      borderWidth: 2,
      borderColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: 'white',
      fontSize: size / 3,
      fontWeight: 'bold',
    },
  });

export default RoundedButton;
