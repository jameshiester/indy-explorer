import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import Chart from './Chart';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useVisualizer } from '@query/visualizer';
import Card from '@shared/card';

const Visualize = () => {
  const [value, setValue] = useState<number[]>([0, 250]);
  const [globalMax, setGlobalMax] = useState(250);
  const [marks, setMarks] = useState<Array<{ value: number; label: string }>>([
    { value: 0, label: '0' },
    { value: 250, label: '250' },
  ]);
  const [debouncedValue] = useDebounce(value, 250, {
    leading: false,
    equalityFn: (left, right) => left[0] === right[0] && left[1] === right[1],
  });

  const { data, totalRecords, isLoading } = useVisualizer(
    ...debouncedValue
  ) || {
    data: undefined,
    totalRecords: 0,
  };
  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(([oldMin, oldMax]) => {
      const [min, max] = newValue as number[];
      if (oldMin > min) {
        return [min, Math.min(min + 500, max)];
      }
      if (oldMax < max) {
        return [Math.max(max - 500, min), max];
      }
      return [min, max];
    });
  };

  useEffect(() => {
    if (totalRecords) {
      setGlobalMax(totalRecords);
      setValue((value) => {
        if (value[1] > totalRecords && totalRecords) {
          value[1] = totalRecords;
        }
        return value;
      });

      setMarks([
        { value: 0, label: '0' },
        { value: totalRecords, label: `${totalRecords}` },
      ]);
    }
  }, [totalRecords]);

  useEffect(() => {}, [totalRecords]);
  return (
    <Box mt={4}>
      <Card title={'Transaction Visualizer'}>
        <Box mx={4}>
          <Typography variant="subtitle2">
            Transaction Range: {value[0]} to {value[1]} ({globalMax} total)
          </Typography>
          <Slider
            value={value}
            onChange={handleChange}
            max={globalMax}
            valueLabelDisplay="auto"
            style={{ maxWidth: 400 }}
          />
        </Box>

        <Chart data={data} />
      </Card>
    </Box>
  );
};

export default Visualize;
