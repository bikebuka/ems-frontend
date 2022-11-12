import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack,  TextField } from '@mui/material';
import call from '../core/services/http/index';
 
import Iconify from '../components/iconify';
 
// components
 

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius:2,
  p: 4,
};

export default function AddDepartments() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

   
 const [payload,setPayload] = useState({
  depertment_name:'',
  depertment_description:''
 
})

 // handle save Department button
 const handleSaveNewDepartment = () => {
  setError(null);
  setLoading(true);
  call("post", 'registerdepertment/', payload)
  .then(res=>{console.log(res)}).catch(err => {
    console.log(err.response.data)
  })
}

 
  return (
    <div>
        <Button variant="contained" onClick={handleOpen} startIcon={<Iconify icon="eva:plus-fill" />}>
            Add Department
        </Button>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Department
          </Typography>
          <Stack spacing={3}>
          <TextField
        value={payload.depertment_name}
        onChange = {(e)=>setPayload({...payload, depertment_name:e.target.value})}
        label="Department Name"
          />

      <TextField
        value={payload. depertment_description}
        onChange = {(e)=>setPayload({...payload,depertment_description:e.target.value})}
        label="Description"
          />
         
        
    {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
     <Button fullWidth size="large" type="submit" variant="contained" value={loading ? 'Loading...' : 'Login'} onClick={handleSaveNewDepartment} disabled={loading}>
       Save Role
     </Button>
        <Button variant="contained" onClick={handleClose} color='error'>Cancel</Button>
      </Stack>
        </Box>
      </Modal>
    </div>
  );
}