import { useAppSelector } from '@/hooks';
import { VChart } from '@visactor/react-vchart';
import type React from 'react';
import { useMemo } from 'react';

const getData = () =>
  ['2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00'].map((time) => ({
    time,
    value: Math.random() * 10,
  }));

export const DashBoard: React.FC = () => {
  const isDark = useAppSelector((state) => state.theme.isDark);

  const spec = useMemo(() => {
    return {
      type: 'line',
      theme: isDark ? 'dark' : 'light',
      data: {
        values: getData(),
      },
      xField: 'time',
      yField: 'value',
    };
  }, [isDark]);
  return (
    <div>
      <VChart spec={spec} />
    </div>
  );
};
