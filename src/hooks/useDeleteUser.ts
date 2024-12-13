import { useCallback, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { useDeleteUserMutation } from "../features/users/userApiSlice";
import { DialogContext } from "../contexts/DialogContext";

const useDeleteUser = (
  deleteUserId: string | null,
  setDeleteUserId: Function
) => {
  const dispatch = useDispatch();
  const { dialogOptions, setDialogOptions } = useContext(DialogContext);
  const [
    deleteUser,
    {
      isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
    },
  ] = useDeleteUserMutation();

  const confirmDelete = useCallback(() => {
    if (deleteUserId) {
      deleteUser(deleteUserId);
    }
    setDeleteUserId(null);
    setDialogOptions({
      ...dialogOptions,
      open: false,
    });
  }, [dispatch, deleteUserId, dialogOptions, setDialogOptions]);

  const onCancel = useCallback(() => {
    setDeleteUserId(null);
    setDialogOptions({
      ...dialogOptions,
      open: false,
    });
  }, [dialogOptions, setDialogOptions]);

  useEffect(() => {
    if (!deleteUserId) return;
    setDialogOptions({
      open: true,
      title: "Delete User",
      message: "Are you sure you want to delete this user?",
      btns: [
        {
          label: "Confirm",
          onClick: confirmDelete,
        },
        {
          label: "Cancel",
          onClick: onCancel,
        },
      ],
    });
  }, [deleteUserId]);

  return [isDeleting, isDeleteSuccess, isDeleteError];
};

export default useDeleteUser;
