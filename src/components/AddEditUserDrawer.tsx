import { useCallback, useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import AddEditUserForm from './AddEditUserForm';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { User } from '../types';

const AddEditUserDrawer = () => {
    const [open, setOpen] = useState(false);
    const selectedUser = useSelector((state: RootState) => state.user.selectedUser);

    const toggleDrawer = useCallback((_: string, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setOpen(open);
    }, []);

    useEffect(() => {
        setOpen(!!selectedUser);
    }, [selectedUser]);

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={toggleDrawer("right", false)}
        >
            <AddEditUserForm user={{...selectedUser as User}} setOpen={setOpen} />
        </Drawer>
    )
};

export default AddEditUserDrawer