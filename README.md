# React Native XML Form Renderer

This project is a React Native application designed to render XML forms. It allows users to input XML data, parse it, and display the corresponding form fields dynamically.

## Folder Structure

```lua
|-- app.js
|-- src
|   |-- components
|   |   |-- DateField.jsx
|   |   |-- DrawingField.jsx
|   |   |-- RadioField.jsx
|   |   |-- TextField.jsx
|   |-- navigation
|   |   |-- appNavigation.js
|   |-- redux
|   |   |-- appSlice.js
|   |   |-- store.js
|   |-- screens
|   |   |-- HomeScreen.jsx
|   |   |-- FormScreen.jsx
|   |-- utils
|       |-- xmlParser.js
```

## Files

### app.js

**Purpose:** Main entry point of the application.

**Functionality:**

- Sets up the Redux store and navigation.
- Renders StatusBar and AppNavigation.

### src/components

This folder contains reusable UI components for rendering different types of form fields.

| Component        | Purpose                       | Props          | Dependencies                                               |
| ---------------- | ----------------------------- | -------------- | ---------------------------------------------------------- |
| DateField.jsx    | Renders a date input field.   | label          | DateTimePicker from @react-native-community/datetimepicker |
| DrawingField.jsx | Renders a drawing field.      | label          | SketchCanvas from @kichiyaki/react-native-sketch-canvas    |
| RadioField.jsx   | Renders a radio button group. | label, options | RadioButton from react-native-paper                        |
| TextField.jsx    | Renders a text input field.   | label          | None                                                       |

Each component follows a similar structure:

- Receives props for customization.
- Renders the label if provided.
- Provides user interaction elements specific to its type.

### src/navigation

This folder contains navigation-related code.

| File             | Purpose                                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| appNavigation.js | Sets up navigation container using React Navigation's StackNavigator. Defines navigation routes for different screens. |

### src/redux

This folder contains Redux-related files for state management.

| File        | Purpose                                                                                                                                        |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| appSlice.js | Defines a Redux slice for managing application state related to XML data and errors. Contains actions for setting XML data and error messages. |
| store.js    | Configures Redux store using configureStore from @reduxjs/toolkit. Combines reducers from appSlice.js to form the root reducer.                |

### src/screens

This folder contains screen components for different parts of the application.

| Component      | Purpose                                                                                                                                              | Functionality |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| HomeScreen.jsx | Represents the home screen of the application. It allows users to input XML data either by selecting a file or using a predefined XML template.      | TBD           |
| FormScreen.jsx | Represents a form screen where XML data is rendered dynamically. It displays the parsed XML data as form fields and allows users to submit the form. | TBD           |

### src/utils

This folder contains utility functions for parsing XML data.

| File         | Purpose                                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| xmlParser.js | Contains utility functions for parsing XML data into a JSON format suitable for rendering form fields in the application. |

## xmlParser.js

This file contains utility functions for parsing XML data into a JSON format suitable for rendering form fields in the application.

### Functions

| Function                            | Purpose                                                                 | Parameters         | Returns                                                             |
| ----------------------------------- | ----------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------- |
| xmlToJson(xml)                      | Converts XML data to JSON format.                                       | xml (string)       | Promise resolving with parsed JSON data or rejecting with an error. |
| transformParsedXmlToJson(parsedXml) | Transforms parsed XML data into JSON format.                            | parsedXml (object) | Array of JSON objects representing form fields.                     |
| formatJson(formJson)                | Formats the JSON data.                                                  | formJson (array)   | Formatted array of JSON objects.                                    |
| extractFieldInfo(group)             | Extracts field information from a group element in the parsed XML data. | group (object)     | JSON object representing a form field or null.                      |
| extractTextField(group)             | Extracts information for a text field from a group element.             | group (object)     | JSON object representing a text field.                              |
| extractDrawingField(group)          | Extracts information for a drawing field from a group element.          | group (object)     | JSON object representing a drawing field.                           |
| extractRadioField(group)            | Extracts information for a radio field from a group element.            | group (object)     | JSON object representing a radio field.                             |
| extractDateField(group)             | Extracts information for a date field from a group element.             | group (object)     | JSON object representing a date field or null.                      |
