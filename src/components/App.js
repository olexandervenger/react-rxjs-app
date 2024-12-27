import React from 'react';
import './App.css';
import { SensorList } from './SensorList/SensorList';

import { createSensorValue$ } from '../rx/createSensorValue';

function App() {
  const sensorsData = {
    A: createSensorValue$('App: A'),
    B: createSensorValue$('App: B'),
    C: createSensorValue$('App: C'),
    D: createSensorValue$('App: D'),
  };

  return (
    <div className="App">
      <SensorList sensorsData={sensorsData} />
    </div>
  );
}

export default App;
