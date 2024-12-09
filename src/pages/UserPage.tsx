import { memo, useState } from 'react'
import Grid from '@mui/material/Grid2';
import { Box, Button, Typography } from '@mui/material';
import { User } from '../types';
import UsersTable from '../features/users/UsersTable'
import AddEditUserDrawer from '../components/AddEditUserDrawer';

interface UserPageProps {
    searchQuery?: string;
}

const UserPage = ({ searchQuery }: UserPageProps) => {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <Box sx={{ width: '100%' }} marginTop={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                    Users
                </Typography>
                <Button variant="contained" color="primary" type="button">Add User</Button>
            </Box>
            <Grid container spacing={2} columns={12}>
                <Grid size={12}>
                    <UsersTable searchQuery={searchQuery} setSelectedUser={setSelectedUser} />
                </Grid>
            </Grid>
            {
                selectedUser &&
                    <AddEditUserDrawer
                        isOpen={true}
                        user={selectedUser as User}
                        setSelectedUser={setSelectedUser}
                    />
            }
        </Box>
    )
}

export default memo(UserPage)