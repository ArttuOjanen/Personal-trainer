import React, {useState} from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function AddTraining(props) {

    const [open, setOpen] = React.useState(false);
    const [customer] = useState(props.customer);
    const [training, setTraining] = React.useState({customer: customer.links[0].href});

    const handleClickOpen = () => {
      setOpen(true);
    }
  
    const handleClose = () => {
      setOpen(false);
    }

    const handleSave = () => {
        props.addTraining(training);
        handleClose();
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.id]: event.target.value})
    }

    return(
        <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        New Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
         
          <TextField
            margin="dense"
            id="date"
            type="datetime-local"
            onChange={inputChanged}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="duration"
            onChange={inputChanged}
            label="Duration"
            fullWidth
            variant="standard"
            type="text"
          />
          <TextField
            margin="dense"
            id="activity"
            onChange={inputChanged}
            label="Activity"
            fullWidth
            variant="standard"
            type="text"
          />
       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
        </div>
    );
}

export default AddTraining;