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
 
export default function AddDepartments() {
 const [open, setOpen] = React.useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);
 
 
 const [payload,setPayload] = useState({
   role_name:'',
   role_description:''
  
 })
 
 
 // handle save role button
 const handleSaveNewRole = () => {
   setError(null);
   setLoading(true);
   call("post", 'registerrole/', payload)
   .then(res=>{console.log(res)}).catch(err => {
     console.log(err.response.data)
   })
 }
 
 
 return (
   <div>
       <Button variant="contained" onClick={handleOpen} startIcon={<Iconify icon="eva:plus-fill" />}>
           Add Roles
       </Button>
    
     <Modal
       open={open}
       onClose={handleClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
     >
       <Box sx={style}>
         <Typography id="modal-modal-title" variant="h6" component="h2">
           Add New Role
         </Typography>
         <Stack spacing={3}>
         <TextField
        value={payload.role_name}
        onChange = {(e)=>setPayload({...payload,role_name:e.target.value})}
        label="Role Name"
          />
 
       <TextField
        value={payload.role_description}
        onChange = {(e)=>setPayload({...payload,role_description:e.target.value})}
        label="Role Description"
          />
       
     {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
     <Button fullWidth size="large" type="submit" variant="contained" value={loading ? 'Loading...' : 'Login'} onClick={handleSaveNewRole} disabled={loading}>
       Save Role
     </Button>
       <Button variant="contained" onClick={handleClose} color='error'>Cancel</Button>
     </Stack>
       </Box>
     </Modal>
   </div>
 );
}
