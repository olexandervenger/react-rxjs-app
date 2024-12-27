import React from 'react';

export const Sensor = ({ name, sensorValue }) => {
  if (sensorValue) {
    return (
      <div style={styles.sensor}>
        <div>{name}:</div>
        <div className={`${name}`}>
          {Date.now() - sensorValue.timestamp < 1300
            ? sensorValue.value
            : 'no data'}
        </div>
      </div>
    );
  }
  return null;
};

const styles = {
  sensor: {
    width: '10%',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#f1f1f1',
    fontSize: '32px',
  },
};
