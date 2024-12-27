import { Observable } from 'rxjs';

const getIntervalValue = (min, max) => {
  return Math.random() * (max - min) + min;
};

const getRandomValue = () => {
  return Math.round(Math.random() * 100);
};

export const createSensorValue$ = () =>
  new Observable((subscriber) => {
    let timeout = null;
    function push() {
      const intervalValue = getIntervalValue(200, 1500);
      const randomSensorValue = getRandomValue();
      timeout = setTimeout(() => {
        subscriber.next({ value: randomSensorValue, timestamp: Date.now() });
        push();
      }, intervalValue);
    }
    push();

    return () => clearTimeout(timeout);
  });
