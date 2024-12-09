import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const chartSetting = {
  yAxis: [
    {
      label: 'Age',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

interface xAxisEntry {
    scaleType: any;
    dataKey: string;
}

interface seriesEntry {
    dataKey: string;
    label: string;
}

interface BarChartProps {
    dataset: { city: string; age: number }[];
    xAxis: xAxisEntry[];
    series: seriesEntry[];
}


export default function SimpleBarChart({ dataset, xAxis, series }: BarChartProps) {
  return (
    <BarChart
      dataset={dataset}
      xAxis={xAxis}
      series={series}
      {...chartSetting}
    />
  );
}