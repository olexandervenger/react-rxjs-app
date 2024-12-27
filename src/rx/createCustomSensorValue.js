import { Observable } from 'rxjs';

export const getIntervalValue = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const getRandomValue = () => {
  return Math.round(Math.random() * 100);
};

export const createCustomSensorValue$ = (name, interval, callback) => {
  let subscriber;

  let timeout = null;
  let count = 1;

  function push() {
    const intervalValue = interval ? interval : getIntervalValue(200, 1500);
    const value = `${name}_${count++}`;
    timeout = setTimeout(() => {
      if (subscriber) {
        subscriber.next({ value: value, timestamp: Date.now() });
      }
      callback({ value: value, timestamp: Date.now() });
      push();
    }, intervalValue);
  }

  push();

  return new Observable((_subscriber) => {
    subscriber = _subscriber;

    return () => {
      clearTimeout(timeout);
    };
  });
};
