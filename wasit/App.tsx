import React from 'react';
import { StatusBar } from 'react-native';

import MainApp from './src/App';
import Contacts from './src/pages/Contacts';

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <MainApp/>
      {/* <Contacts /> */}
    </>
  );
}


export default App