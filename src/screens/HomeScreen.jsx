import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { readFile } from 'react-native-fs';
import { useDispatch } from 'react-redux';
import { setXmlData, setError } from '../redux/appSlice';
import xmlToJson from '../utils/xmlParser';

const PREDEFINED_XML = `
<div>
  <div 
    id="formSide1" 
    class="formSide" 
    style="padding: 90px; width: 1122px; height: 1588px; display: inline-block">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      id="svgWrap1" 
      class="svgWrap" 
      width="1122" 
      height="1588" 
      x="0" 
      y="0" 
      style="position: relative">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        id="svgContent1" 
        class="svgContent" 
        viewBox="0 0 1122 1588" 
        x="0" 
        y="0" 
        style="cursor: default">
        <g id="formSide1Grid" class="formSideGrid" transform="translate(0,0)">
          <path
            d="M37,37 L37,1551 1085,1551 1085,37 37,37 M37,67 L1085,67 M37,97 L1085,97 M37,127 L1085,127 M37,157 L1085,157 M37,187 L1085,187 M37,217 L1085,217 M37,247 L1085,247 M37,277 L1085,277 M37,307 L1085,307 M37,337 L1085,337 M37,367 L1085,367 M37,397 L1085,397 M37,427 L1085,427 M37,457 L1085,457 M37,487 L1085,487 M37,517 L1085,517 M37,547 L1085,547 M37,577 L1085,577 M37,607 L1085,607 M37,637 L1085,637 M37,667 L1085,667 M37,697 L1085,697 M37,727 L1085,727 M37,757 L1085,757 M37,787 L1085,787 M37,817 L1085,817 M37,847 L1085,847 M37,877 L1085,877 M37,907 L1085,907 M37,937 L1085,937 M37,967 L1085,967 M37,997 L1085,997 M37,1027 L1085,1027 M37,1057 L1085,1057 M37,1087 L1085,1087 M37,1117 L1085,1117 M37,1147 L1085,1147 M37,1177 L1085,1177 M37,1207 L1085,1207 M37,1237 L1085,1237 M37,1267 L1085,1267 M37,1297 L1085,1297 M37,1327 L1085,1327 M37,1357 L1085,1357 M37,1387 L1085,1387 M37,1417 L1085,1417 M37,1447 L1085,1447 M37,1477 L1085,1477 M37,1507 L1085,1507 M37,1537 L1085,1537 M67,37 L67,1551 M97,37 L97,1551 M127,37 L127,1551 M157,37 L157,1551 M187,37 L187,1551 M217,37 L217,1551 M247,37 L247,1551 M277,37 L277,1551 M307,37 L307,1551 M337,37 L337,1551 M367,37 L367,1551 M397,37 L397,1551 M427,37 L427,1551 M457,37 L457,1551 M487,37 L487,1551 M517,37 L517,1551 M547,37 L547,1551 M577,37 L577,1551 M607,37 L607,1551 M637,37 L637,1551 M667,37 L667,1551 M697,37 L697,1551 M727,37 L727,1551 M757,37 L757,1551 M787,37 L787,1551 M817,37 L817,1551 M847,37 L847,1551 M877,37 L877,1551 M907,37 L907,1551 M937,37 L937,1551 M967,37 L967,1551 M997,37 L997,1551 M1027,37 L1027,1551 M1057,37 L1057,1551"
            fill="none"
            style="stroke-width: 1; stroke: #d2d2d2; pointer-events: none"
            shape-rendering="crispedges"
            vector-effect="non-scaling-stroke"
          />
        </g>
        <g 
          id="formSide1Main" 
          class="formSideMain" 
          style="pointer-events: all" 
          fdtpagesize="Tablet_10" 
          fdtpageorientation="portrait">
          <g 
            id="fdtElemNameGroup" 
            fdtType="iso" 
            fdtFieldName="Name" 
            fdtMandatory="false" 
            fdtTabIndex="1" 
            fdtFormat="Alpha - Uppercase" 
            fdtX="100" 
            fdtY="100">
            <text 
              id="fdtElemNameLabel" 
              x="105" 
              y="95" 
              fill="#000000">
              Name
            </text>
          </g>
          <g 
            id="fdtElemDOBGroup" 
            fdtType="iso" 
            fdtFieldName="DateOfBirth" 
            fdtMandatory="false" 
            fdtTabIndex="2" 
            fdtFormat="Numerical - DD/MM/YYYY" 
            fdtX="100" 
            fdtY="200">
            <text 
              id="fdtElemDOBLabel" 
              x="105" 
              y="195" 
              fill="#000000">
              Date of Birth
            </text>
          </g>
          <g 
            id="fdtElemGenderGroup" 
            fdtType="radioList" 
            fdtTabIndex="3" 
            fdtFieldName="Male" 
            fdtMandatory="false">
            <rect 
              id="fdtElemGenderMale" 
              x="100" 
              y="300" 
              width="24" 
              height="24" />
            <text 
              id="fdtElemGenderMaleLabel" 
              x="130" 
              y="318" 
              fill="#000000">
              Male
            </text>
          </g>
          <g 
            id="fdtElemGenderGroup" 
            fdtType="radioList" 
            fdtTabIndex="3" 
            fdtFieldName="Female" 
            fdtMandatory="false">
            <rect 
              id="fdtElemGenderFemale" 
              x="200" 
              y="300" 
              width="24" 
              height="24" />
            <text 
              id="fdtElemGenderFemaleLabel" 
              x="230" 
              y="318" 
              fill="#000000">
              Female
            </text>
          </g>
          <g 
            id="fdtElemSignatureGroup" 
            fdtType="cursiveSignature" 
            fdtFieldName="Signature" 
            fdtMandatory="false" 
            fdtTabIndex="4" 
            fdtX="100" 
            fdtY="400">
            <rect 
              id="fdtElemSignature" 
              width="315" 
              height="135" 
              x="100" 
              y="400" 
              fill="#FFFFFF" 
              stroke="#000000" />
            <text 
              id="fdtElemSignatureLabel" 
              x="105" 
              y="395" 
              fill="#000000">
              Signature
            </text>
          </g>
        </g>
      </svg>
    </svg>
  </div>
</div>

`;

const HomeScreen = ({ navigation }) => {
  const [xmlInput, setXmlInput] = useState('');
  const dispatch = useDispatch();

  const handlePredefinedXml = async () => {
    try {
      setXmlInput(PREDEFINED_XML);
    } catch (error) {
      showAlert('Error', 'Failed to load the predefined XML form.');
    }
  };

  const handleSelectXMLFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.plainText],
      });
      
      const fileContent = await readFile(res[0].uri, 'utf8');
      setXmlInput(fileContent);
    } catch (err) {
      handleDocumentPickerError(err);
    }
  };

  const handleDocumentPickerError = (err) => {
    if (DocumentPicker.isCancel(err)) {
      console.log('User cancelled file picker');
    } else {
      console.log(err);
      dispatch(setError('Failed to read the XML file. Please try again.'));
      showAlert('Error', 'Failed to read the XML file. Please try again.');
    }
  };

  const handleSubmit = async () => {
    if (!xmlInput.trim()) {
      dispatch(setError('XML input is empty. Please enter valid XML data.'));
      showAlert('Error', 'XML input is empty. Please enter valid XML data.');
      return;
    }
    try {
      const formData = await xmlToJson(xmlInput);
      dispatch(setXmlData(formData));
      navigation.navigate('Form');
    } catch (error) {
      dispatch(setError(error.message));
      showAlert('Error', 'Failed to parse XML data. Please ensure the format is correct.');
    }
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  const handleXMLChange = (text) => {
    setXmlInput(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.indicatorContainer}>
        <View style={styles.statusIndicator} />
        <Text style={styles.header}>XML Form Renderer</Text>
      </View>
      <Text style={styles.instructions}>
        Provide your XML file or code to render the form. (Note: Make sure it should be in correct format)
      </Text>
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity style={[styles.button, {flex:1, marginRight: 2}]} onPress={handlePredefinedXml}>
          <Text style={styles.buttonText}>Load Default Form</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {flex:1}]} onPress={handleSelectXMLFile}>
          <Text style={styles.buttonText}>Select XML File</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.xmlInput}
        multiline
        placeholder="Form XML Input"
        value={xmlInput}
        onChangeText={handleXMLChange}
      />
      <TouchableOpacity style={[styles.button, styles.renderButton]} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Render Form</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginRight: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  instructions: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 40,
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  xmlInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 400,
    textAlignVertical: 'top',
    marginBottom: 10,
    color: 'black'
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  renderButton: {
    backgroundColor: '#28a745',
  },
});

export default HomeScreen;