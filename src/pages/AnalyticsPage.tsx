import Grid from "@mui/material/Grid2";
import { ReactNode, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import PieChart from "../components/charts/PieChart";
import SimpleBarChart from "../components/charts/SimpleBarChart";
import { useGetStatsQuery } from "../features/stats/statsApiSlice";
import Loading from "../components/Loading";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";

const AnalyticsPage = () => {
  const [groupByKey, setGroupByKey] = useState("country");
  const { isLoading, data } = useGetStatsQuery({ _groupby: groupByKey });

  const handleChange = (event: SelectChangeEvent<string>, _: ReactNode) => {
    setGroupByKey(event.target.value as string);
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid className="analytics-page-header">
          <Box className="analytics-page-header-content">
            <Typography component="h6" variant="h6">
              Group by attribute
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="group-by-key-label">Grouping</InputLabel>
              <Select
                labelId="group-by-key-label"
                id="group-by-key"
                value={groupByKey}
                label="Grouping"
                className="group-by-key-select"
                onChange={handleChange}
              >
                <MenuItem value="age">Age</MenuItem>
                <MenuItem value="country">Country</MenuItem>
                <MenuItem value="gender">Gender</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PieChart data={data} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SimpleBarChart
            dataset={data}
            xAxis={[{ scaleType: "band", dataKey: "label" }]}
            series={[{ label: "Users", dataKey: "value" }]}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AnalyticsPage;
