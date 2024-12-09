import { useCallback, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { User } from '../types';
import AddEditUserForm from './AddEditUserForm';

interface AddEditUserDrawerProps {
    isOpen: boolean;
    user: User;
    setSelectedUser: Function
};

const AddEditUserDrawer = ({ isOpen, user, setSelectedUser }: AddEditUserDrawerProps) => {
    const [open, setOpen] = useState(isOpen);

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
        if (!open) setSelectedUser(null);
    }, []);

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={toggleDrawer("right", false)}
        >
            <AddEditUserForm user={user} />
        </Drawer>
    )
}

export default AddEditUserDrawer