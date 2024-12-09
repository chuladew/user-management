import { TextField, Button, Select, FormControl, InputLabel, MenuItem, Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { User } from "../types";
import { useAddUserMutation, useUpdateUserMutation } from "../features/users/userSlice";


const ageValues = () => {
    const values = [];
    for (let i = 0; i < 100; i++) {
        values.push(i);
    }
    return values;
}

const genderValues = () => {
    return [
        {
            label: 'Male',
            value: 'male'
        },
        {
            label: 'Female',
            value: 'female'
        },
    ]
};

var countries = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bangladesh', 'Barbados', 'Bahamas', 'Bahrain', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo-Brazzaville', 'Congo-Kinshasa', 'Cook Islands', 'Costa Rica', '$_[', 'Croatia', 'Curaçao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'El Salvador', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Federated States of Micronesia', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Lands', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and McDonald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Réunion', 'Romania', 'Russia', 'Rwanda', 'Saint Barthélemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent', 'Samoa', 'San Marino', 'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Swaziland', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Vietnam', 'Venezuela', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];

export default function AddEditUserForm({ user }: { user: User }) {
    const {
        id = null,
        firstName = '',
        lastName = '',
        age = '',
        gender = 'male',
        country = 'United States',
        email = ''
    } = user;

    const [
        updateUser,
        { isLoading: isUpdating },
    ] = useUpdateUserMutation()

    const [
        addUser,
        { isLoading: isCreating },
    ] = useAddUserMutation()

  const formValidation = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().optional(),
    age: Yup.number().required("Age is required"),
    gender: Yup.string().required("Gender is required"),
    country: Yup.string().required("Country is required"),
    email: Yup.string().email().required("Email is required")
  });

  const myForm = useFormik({
    initialValues: {
        firstName,
        lastName,
        age,
        gender,
        country,
        email
    },
    validationSchema: formValidation,
    onSubmit: (values) => {
        if (id) {
            updateUser(values);
        } else {
            addUser(values);
        }
    }
  });

  return (
    <Box sx={{ width: 500, padding: 5, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }} marginTop={3}>
        <TextField
            required
            fullWidth
            label="First Name"
            name="firstName"
            value={myForm.values.firstName}
            onChange={myForm.handleChange}
            error={!!myForm.errors.firstName}
            helperText={myForm.errors.firstName}
        />
        <TextField
            required
            fullWidth
            label="Last Name"
            name="lastName"
            value={myForm.values.lastName}
            onChange={myForm.handleChange}
            error={!!myForm.errors.lastName}
            helperText={myForm.errors.lastName}
        />
        <TextField
            required
            fullWidth
            label="Email"
            name="email"
            value={myForm.values.email}
            onChange={myForm.handleChange}
            error={!!myForm.errors.email}
            helperText={myForm.errors.email}
        />
        <FormControl fullWidth>
            <InputLabel id="age-select-label">Age</InputLabel>
            <Select
                labelId="age-select-label"
                id="age-select"
                value={age}
                label="Age"
            >
                {
                    ageValues().map((age) => (
                        <MenuItem key={`index-${age}`} value={age}>{age}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>

        <FormControl fullWidth>
            <InputLabel id="gender-select-label">Gender</InputLabel>
            <Select
                labelId="gender-select-label"
                id="gender-select"
                value={gender.toLowerCase()}
                label="Gender"
            >
                {
                    genderValues().map(({ label, value }) => (
                        <MenuItem key={value} value={value}>{label}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>

        <FormControl fullWidth>
            <InputLabel id="country-select-label">Country</InputLabel>
            <Select
                labelId="country-select-label"
                id="country-select"
                value={country.toLowerCase()}
                label="Country"
            >
                {
                    countries.map((country) => (
                        <MenuItem key={country.toLowerCase()} value={country.toLowerCase()}>{country}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
            <Button
                disabled={!myForm.isValid}
                onClick={myForm.submitForm}
                variant="contained"
            >
                Submit
            </Button>
            <Button
                variant="contained"
                onClick={myForm.resetForm}
            >
                Cancel
            </Button>
        </Box>
    </Box>
  );
}
