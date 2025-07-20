import { VChart } from '@visactor/react-vchart';
import type React from 'react';
import { useRef, useState } from 'react';

const getData = () =>
  ['2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00'].map((time) => ({
    time,
    value: Math.random() * 10,
  }));

const getSpec = () => ({
  type: 'line',
  data: {
    values: getData(),
  },
  xField: 'time',
  yField: 'value',
});
export const DashBoard: React.FC = () => {
  const [spec, setSpec] = useState(getSpec());
  const chartRef = useRef(null);

  return (
    <div>
      <VChart ref={chartRef} spec={spec} />
    </div>
  );
};
