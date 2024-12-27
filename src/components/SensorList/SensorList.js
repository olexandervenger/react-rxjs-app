import React, { useEffect, useState } from 'react';
import { combineLatest, throttleTime } from 'rxjs';
import { Sensor } from './Sensor';

export const SensorList = ({ sensorsData }) => {
  const [sensorValues, setSensorValues] = useState();

  useEffect(() => {
    const subscription = combineLatest(sensorsData)
      .pipe(throttleTime(200))
      .subscribe(setSensorValues);

    return () => subscription.unsubscribe();
  }, [sensorsData, setSensorValues]);

  if (sensorValues) {
    return (
      <div className="sensors" style={styles.sensorsContainer}>
        {Object.entries(sensorValues).map(([name, value]) => {
          return <Sensor key={name} name={name} sensorValue={value} />;
        })}
      </div>
    );
  }
  return null;
};

const styles = {
  sensorsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    height: '100vh',
  },
};
