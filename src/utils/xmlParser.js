import { parseString } from 'react-native-xml2js';

const xmlToJson = (xml) => {
  return new Promise((resolve, reject) => {
    parseString(xml, { explicitArray: false, ignoreAttrs: false }, (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Failed to parse XML. Please check the format.'));
      } else {
        try {
          const formJson = transformParsedXmlToJson(result);
          const formattedFormJson = formatJson(formJson)
          resolve(formattedFormJson);
        } catch (error) {
          reject(new Error('Error transforming XML to JSON. Please ensure the XML format is correct.'));
        }
      }
    });
  });
};

const transformParsedXmlToJson = (parsedXml) => {
  const fields = [];

  // Assuming 'formSideMain' is the main container for form fields
  const formMain = parsedXml.div.div.svg.svg.g.filter(g => g.$.id === 'formSide1Main')[0];
  // Iterate over the groups to extract field information
  formMain.g.forEach(group => {
    const field = extractFieldInfo(group);
    if (field) fields.push(field);
  });

  return fields;
};

const formatJson = (formJson) => {
  const formattedFormJson = [];

  formJson.forEach(field => {
    if (field.type === "radio") {
      const existingRadioField = formattedFormJson.find(f => f.fieldIndex === field.fieldIndex && f.type === "radio");
      if (existingRadioField) {
        existingRadioField.options.push(field.label);
      } else {
        formattedFormJson.push({
          fieldName: "Options"+field.fieldIndex,
          fieldIndex: field.fieldIndex,
          type: "radio",
          options: [field.label]
        });
      }
    } else {
      formattedFormJson.push(field);
    }
  });

  return formattedFormJson;
}

const extractFieldInfo = (group) => {
  const type = group.$.fdtType;
  const format = group.$.fdtFormat;

  if(type === 'iso' && format === 'Alpha - Uppercase'){
    return extractTextField(group);
  }
  else if((type === 'date' || type === 'iso') && format === 'Numerical - DD/MM/YYYY'){
    return extractDateField(group);
  }
  else if(type === 'cursiveSignature'){
    return extractDrawingField(group);
  }
  else if(type === 'radioList'){
    return extractRadioField(group);
  }
  else{
    return null;
  }
};

const extractTextField = (group) => {
  return {
    type: 'text',
    fieldIndex: group.$.fdtTabIndex,
    fieldName: group.$.fdtFieldName,
    mandatory: group.$.fdtMandatory === 'true',
    tabIndex: parseInt(group.$.fdtTabIndex, 10),
  };
};

const extractDrawingField = (group) => {
  return {
    type: 'drawing',
    fieldIndex: group.$.fdtTabIndex?group.$.fdtTabIndex:group.$.fdtFieldName,
    fieldName: group.$.fdtFieldName,
  };
};

const extractRadioField = (group) => {
  return {
    type: 'radio',
    fieldIndex: group.$.fdtTabIndex,
    label: group.$.fdtFieldName,
  };
};

const extractDateField = (group) => {
  if (group.$.fdtFormat?.includes('DD/MM/YYYY')) {
    return {
      type: 'date',
      fieldIndex: group.$.fdtTabIndex,
      fieldName: group.$.fdtFieldName,
      format: group.$.fdtFormat,
      mandatory: group.$.fdtMandatory === 'true',
      tabIndex: parseInt(group.$.fdtTabIndex, 10),
    };
  }
  return null;
};

export default xmlToJson;