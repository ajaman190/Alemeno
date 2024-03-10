import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import AppNavigation from './src/navigation/appNavigation';
import {StatusBar} from 'react-native';

function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <AppNavigation />
    </Provider>
  );
}

export default App;
