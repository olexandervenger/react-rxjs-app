import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import React from 'react';
import { SensorList } from '../components/SensorList/SensorList';
import { createCustomSensorValue$ } from '../rx/createCustomSensorValue';
import { Observable } from 'rxjs';
import { waitFor } from '@testing-library/dom';

describe('SensorList', () => {
  describe('contains latest value of each sensor A, B, C, D', () => {
    let container;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
      document.body.removeChild(container);
      container.remove();
      container = null;
    });

    test('view object contains latest value of each sensor A, B, C, D.', async () => {
      const valuesToCompare = {
        A: [],
        B: [],
        C: [],
        D: [],
      };

      const sensorsData = {
        A: createCustomSensorValue$('A', null, (data) =>
          valuesToCompare.A.push(data)
        ),
        B: createCustomSensorValue$('B', null, (data) =>
          valuesToCompare.B.push(data)
        ),
        C: createCustomSensorValue$('C', null, (data) =>
          valuesToCompare.C.push(data)
        ),
        D: createCustomSensorValue$('D', null, (data) =>
          valuesToCompare.D.push(data)
        ),
      };

      act(() => {
        ReactDOM.render(<SensorList sensorsData={sensorsData} />, container);
      });

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      const sensorA = document.querySelector('.A');
      const sensorB = document.querySelector('.B');
      const sensorC = document.querySelector('.C');
      const sensorD = document.querySelector('.D');

      expect(sensorA.innerHTML).toContain(
        valuesToCompare.A[valuesToCompare.A.length - 1].value
      );
      expect(sensorB.innerHTML).toContain(
        valuesToCompare.B[valuesToCompare.B.length - 1].value
      );
      expect(sensorC.innerHTML).toContain(
        valuesToCompare.C[valuesToCompare.C.length - 1].value
      );
      expect(sensorD.innerHTML).toContain(
        valuesToCompare.D[valuesToCompare.D.length - 1].value
      );
    });

    test('If a specific sensor is not sending data for 1300ms, its value (in the view object) should be "no data"', async () => {
      const sensor = new Observable((subscriber) => {
        let timeout = null;
        function push() {
          timeout = setTimeout(() => {
            subscriber.next({
              value: 'A',
              timestamp: Date.now() - 1300,
            });
            push();
          }, 1300);
        }
        push();

        return () => clearTimeout(timeout);
      });

      const sensorsData = {
        A: sensor,
      };

      act(() => {
        ReactDOM.render(<SensorList sensorsData={sensorsData} />, container);
      });

      act(() => {
        jest.runOnlyPendingTimers();
      });

      const sensorComponent = document.querySelector('.A');

      await waitFor(() =>
        expect(sensorComponent.innerHTML).toContain('no data')
      );
    });
  });
});
