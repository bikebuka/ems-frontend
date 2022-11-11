import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
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
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddUser() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [payload,setPayload] = useState({
    first_name:'',
    last_name:'',
    username:'',
    email:'',
    password:'',
    password2:''

  })

  // handle save button
  const handleSaveNewUser = () => {
    setOpen(false)
    setError(null);
    setLoading(true);
    call("post", 'registerusers', payload)
    .then(res=>{console.log(res)}).catch(err => {
      console.log(err.response.data)

    })
  }


 
     
  
 
  return (
    <div>
        <Button variant="contained" onClick={handleOpen} startIcon={<Iconify icon="eva:plus-fill" />}>
            AddUser
        </Button>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New User
          </Typography>
          <Stack spacing={3}>
        <TextField
         value={payload.first_name}
         onChange = {(e)=>setPayload({...payload,first_name:e.target.value})}
         label="First Name" 
           />
           
          <TextField
          value={payload.last_name}
          onChange = {(e)=>setPayload({...payload,last_name:e.target.value})}
          label="Last Name" 
                    />

          <TextField
          value={payload.username}
          onChange = {(e)=>setPayload({...payload,username:e.target.value})}
          label="Username" 
                    />
          <TextField
          value={payload.email}
          onChange = {(e)=>setPayload({...payload,email:e.target.value})}
          label="Email" 
                    />
       

        <TextField
          value={payload.password}
          onChange = {(e)=>setPayload({...payload,password:e.target.value})}
          type={showPassword ? 'text' : 'password'}
          label="Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>

            ),
          }}
        />

      <TextField
          value={payload.password2}
          onChange = {(e)=>setPayload({...payload,password2:e.target.value})}
          type={showPassword ? 'text' : 'password'}
          label="Cornfirm Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>

            ),
          }}
        />


      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <Button fullWidth size="large" type="submit" variant="contained" value={loading ? 'Loading...' : 'Login'} onClick={handleSaveNewUser} disabled={loading}>
        Save User
      </Button>
        <Button variant="contained"  onClick={handleClose} color='error'>Cancel</Button>
      </Stack>
        </Box>
      </Modal>
    </div>
  );
}