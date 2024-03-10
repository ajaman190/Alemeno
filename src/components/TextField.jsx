import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const TextField = ({ label }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder='Type...'
        placeholderTextColor='gray'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    color: 'black',
  },
  input: {
    color: 'black',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default TextField;
