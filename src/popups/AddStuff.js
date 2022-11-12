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
 p: 4,
 borderRadius:2
};
 
export default function AddStuff() {
 const [open, setOpen] = React.useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);
 
 
 const [payload,setPayload] = useState({
    staff_id:'',
    user_id:'',
    role_id:'',
    depertment_id:'',
    staff_description:''
  
 })
 
 
 // handle save role button
 const handleSaveNewStuff = () => {
   setError(null);
   setLoading(true);
   call("post", 'registerstaff', payload)
   .then(res=>{console.log(res)}).catch(err => {
     console.log(err.response.data)
   })
 }
 
 
 return (
   <div>
       <Button variant="contained" onClick={handleOpen} startIcon={<Iconify icon="eva:plus-fill" />}>
           Add Stuff
       </Button>
    
     <Modal
       open={open}
       onClose={handleClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
     >
       <Box sx={style}>
         <Typography id="modal-modal-title" variant="h6" component="h2">
           Add New Stuff
         </Typography>
         <Stack spacing={3}>
         {/* <TextField
        value={payload.staff_id}
        onChange = {(e)=>setPayload({...payload,staff_id:e.target.value})}
        label="Stuff Name"
          /> */}
 
      

        <TextField
        value={payload.role_id}
        onChange = {(e)=>setPayload({...payload,role_id:e.target.value})}
        label="Role"
          />

        <TextField
        value={payload.depertment_id}
        onChange = {(e)=>setPayload({...payload,depertment_id:e.target.value})}
        label="Department"
          />

        <TextField
        value={payload.staff_description}
        onChange = {(e)=>setPayload({...payload,staff_description:e.target.value})}
        label="Staff Description"
          />
       
     {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
     <Button fullWidth size="large" type="submit" variant="contained" value={loading ? 'Loading...' : 'Login'} onClick={handleSaveNewStuff} disabled={loading}>
       Save Staff
     </Button>
       <Button variant="contained" onClick={handleClose} color='error'>Cancel</Button>
     </Stack>
       </Box>
     </Modal>
   </div>
 );
}
