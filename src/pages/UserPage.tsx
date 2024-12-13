import { memo } from "react";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid2";
import { Box, Button, Typography } from "@mui/material";
import AddEditUserDrawer from "../components/AddEditUserDrawer";
import { setSelectedUser } from "../features/users/userSlice";
import DataTable from "../components/DataTable";

const UserPage = () => {
  const dispatch = useDispatch();

  const handleAddUser = () => {
    dispatch(setSelectedUser({}));
  };

  return (
    <Box className="user-page-container">
      <Box className="user-page-header">
        <Typography component="h2" variant="h6" className="header-title">
          Users
        </Typography>
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handleAddUser}
        >
          Add User
        </Button>
      </Box>
      <Grid container spacing={2} columns={12}>
        <Grid size={12}>
          <DataTable />
        </Grid>
      </Grid>
      <AddEditUserDrawer />
    </Box>
  );
};

export default memo(UserPage);
