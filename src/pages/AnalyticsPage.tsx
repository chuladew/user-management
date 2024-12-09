import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import PieChart from '../components/charts/PieChart';
import SimpleBarChart from '../components/charts/SimpleBarChart';
import { selectGroupedUsersData, useGetUserStatsQuery } from '../features/users/userSlice';
import Loading from '../components/Loading';

const AnalyticsPage = () => {
    const groupedByCity = useSelector(selectGroupedUsersData);
    const { isLoading, data } = useGetUserStatsQuery('');

    if (isLoading) return <Loading />
    return (
        <>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Overview
            </Typography>
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{ mb: (theme) => theme.spacing(2) }}
            >
                <Grid size={{ xs: 12, md: 6 }}>
                    <PieChart data={Object.values(groupedByCity)} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <SimpleBarChart
                        dataset={data}
                        xAxis={[{ scaleType: 'band', dataKey: 'city' }]}
                        series={[{ dataKey: 'age', label: 'Age' }]}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default AnalyticsPage