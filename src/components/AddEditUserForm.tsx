import { useCallback, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Autocomplete,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { User } from "../types";
import {
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../features/users/userApiSlice";
import { countries, genderLabels } from "../constants";
import { setSelectedUser } from "../features/users/userSlice";

const ageValues = () => {
  const values = [];
  for (let i = 16; i < 100; i++) {
    values.push(i);
  }
  return values;
};

interface AddEditUserFormProps {
  user: User;
  setOpen: Function;
}

const AddEdituserForm = ({ user, setOpen }: AddEditUserFormProps) => {
  const dispatch = useDispatch();
  const {
    id = null,
    firstName = "",
    lastName = "",
    age = "",
    gender = "male",
    country = "United States",
    email = "",
  } = user;

  const [updateUser, { isLoading: isUpdating, isSuccess: isUpdateSuccess }] =
    useUpdateUserMutation();

  const [addUser, { isLoading: isCreating, isSuccess: isCreateSuccess }] =
    useAddUserMutation();

  const [deleteUser, { isLoading: isDeleting, isSuccess: isDeleteSuccess }] =
    useDeleteUserMutation();

  const formValidation = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().optional(),
    age: Yup.number().required("Age is required"),
    gender: Yup.string().required("Gender is required"),
    country: Yup.string().required("Country is required"),
    email: Yup.string().email().required("Email is required"),
  });

  const userForm = useFormik({
    initialValues: {
      firstName,
      lastName,
      age,
      gender,
      country,
      email,
    },
    validationSchema: formValidation,
    onSubmit: (data) => {
      if (id) {
        updateUser({ ...data, id } as User);
      } else {
        addUser(data as User);
      }
    },
  });

  useEffect(() => {
    if (isUpdateSuccess || isCreateSuccess || isDeleteSuccess) {
      userForm.resetForm();
      setOpen(false);
      dispatch(setSelectedUser(null));
    }
  }, [isUpdateSuccess, isCreateSuccess, userForm, setOpen, dispatch]);

  const onCancel = useCallback(() => {
    userForm.resetForm();
    setOpen(false);
    dispatch(setSelectedUser(null));
  }, [dispatch, userForm, setOpen]);

  const onDelete = useCallback(() => {
    if (id) {
      deleteUser(id as string);
    }
  }, [id, setOpen]);

  return (
    <Box className="add-edit-user-form-container">
      <Typography component="h5" variant="h5" marginBottom={2}>
        {id ? "Edit User" : "Add User"}
      </Typography>
      <TextField
        required
        fullWidth
        label="First Name"
        name="firstName"
        value={userForm.values.firstName}
        onChange={userForm.handleChange}
        error={!!userForm.errors.firstName}
        helperText={userForm.errors.firstName}
      />
      <TextField
        required
        fullWidth
        label="Last Name"
        name="lastName"
        value={userForm.values.lastName}
        onChange={userForm.handleChange}
        error={!!userForm.errors.lastName}
        helperText={userForm.errors.lastName}
      />
      <TextField
        required
        fullWidth
        label="Email"
        name="email"
        value={userForm.values.email}
        onChange={userForm.handleChange}
        error={!!userForm.errors.email}
        helperText={userForm.errors.email}
      />
      <TextField
        required
        fullWidth
        label="Age"
        name="age"
        select={true}
        value={userForm.values.age}
        onChange={userForm.handleChange}
        error={!!userForm.errors.age}
        helperText={userForm.errors.age}
      >
        {ageValues().map((age) => (
          <MenuItem key={`index-${age}`} value={age}>
            {age}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        required
        fullWidth
        label="Gender"
        name="gender"
        select={true}
        value={userForm.values.gender.toLowerCase()}
        onChange={(e) => {
          userForm.setFieldValue(
            "gender",
            genderLabels[(e.target as HTMLTextAreaElement).value]
          );
        }}
        error={!!userForm.errors.gender}
        helperText={userForm.errors.gender}
      >
        {Object.keys(genderLabels).map((key: keyof typeof genderLabels) => (
          <MenuItem key={key} value={key}>
            {genderLabels[key]}
          </MenuItem>
        ))}
      </TextField>
      <Autocomplete
        fullWidth
        disablePortal
        options={countries}
        value={userForm.values.country}
        getOptionLabel={(option) => option}
        onChange={(e) => {
          userForm.setFieldValue("country", (e.target as any).textContent);
        }}
        renderInput={(params) => <TextField {...params} label="Country" />}
      />
      <Box className="user-form-actions-container">
        <LoadingButton
          loading={isUpdating || isCreating || isDeleting}
          variant="contained"
          onClick={userForm.submitForm}
        >
          Submit
        </LoadingButton>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        {id && (
          <Button variant="outlined" onClick={onDelete}>
            Delete
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default AddEdituserForm;
