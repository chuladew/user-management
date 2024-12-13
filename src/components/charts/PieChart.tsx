import Box from "@mui/material/Box";
import { PieChart as MuiPieChart } from "@mui/x-charts/PieChart";

interface PieChartProps {
  data: { value: number; label: string }[] | undefined;
}

const PieChart = ({ data }: PieChartProps) => {
  return (
    <Box>
      <MuiPieChart
        height={300}
        series={[
          {
            data,
            innerRadius: 50,
            arcLabel: (params) => params.label ?? "",
            arcLabelMinAngle: 20,
          },
        ]}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "top", horizontal: "middle" },
            padding: 0,
            hidden: true,
          },
        }}
      />
    </Box>
  );
};

export default PieChart;
