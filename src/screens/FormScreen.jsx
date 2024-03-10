import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import TextField from '../components/TextField';
import DateField from '../components/DateField';
import RadioField from '../components/RadioField';
import DrawingField from '../components/DrawingField';

const renderField = (field, index) => {
  switch (field.type) {
    case 'text':
      return <TextField key={index} label={field.fieldName} />;
    case 'date':
      return <DateField key={index} label={field.fieldName} />;
    case 'radio':
      return <RadioField key={index} label={field.fieldName} options={field.options} />;
    case 'drawing':
      return <DrawingField key={index} label={field.fieldName} />;
    default:
      return <Text key={index}>Unsupported field type</Text>;
  }
};

const FormScreen = () => {
  const xmlData = useSelector((state) => state.app.xmlData);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    setFormData(xmlData);
  }, [xmlData]);

  if (!formData) {
    return (
      <View style={styles.container}>
        <Text>Loading form...</Text>
      </View>
    );
  }

  const hnadleFormSubmit = () => {
    console.log('Submit')
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.statusBar}>
        <View style={styles.indicator} />
        <Text style={styles.title}>Rendered Form</Text>
      </View>
      <View>
        {formData.map((field, index) => renderField(field, index))}
      </View>
      <TouchableOpacity style={styles.button} onPress={hnadleFormSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginRight: 8
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 40
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default FormScreen;
