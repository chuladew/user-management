import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogBtn {
  label: string;
  onClick: () => void;
}

interface AlertDialogProps {
  open: boolean;
  title: string;
  message: string;
  btns: AlertDialogBtn[];
}

const ConfirmDialog = ({ title, message, btns, open }: AlertDialogProps) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        { title }
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          { message }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {btns.map((btn, i) => (
          <Button key={`btn-${i}-${btn.label}`} onClick={() => btn.onClick()} color="primary">
            {btn.label}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;