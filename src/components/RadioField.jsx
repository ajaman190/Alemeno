import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

const RadioField = ({ label, options }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.optionContainer}>
        {options.map((option, index) => (
          <View key={option} style={styles.radioContainer}>
            <RadioButton
              value={option}
              status={selectedOption === index ? 'checked' : 'unchecked'}
              onPress={() => setSelectedOption(index)}
              color="#007bff"
            />
            <Text style={styles.radioText}>{option}</Text>
          </View>
        ))}
      </View>
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
  optionContainer: {},
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioText: {
    marginLeft: 8,
    color: 'black',
  },
});

export default RadioField;
