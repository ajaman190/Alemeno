import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SketchCanvas } from '@kichiyaki/react-native-sketch-canvas';

const DrawingField = ({ label }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.canvasContainer}>
        <SketchCanvas
          style={styles.canvas}
          strokeColor={'black'}
          strokeWidth={4}
        />
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
  canvasContainer: {
    height: 200,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    overflow: 'hidden',
  },
  canvas: {
    flex: 1,
  },
});

export default DrawingField;
