import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import call from '../../../core/services/http';
// components
import Iconify from '../../../components/iconify';
 
 

// ----------------------------------------------------------------------

export default function LoginForm(props) {
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [payload,setPayload] = useState({
    username:'',
    password:''
  })
  

 

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
  call("post", 'login' , payload)
  .then(res =>{console.log(res)}).catch(err => { 
    console.log(err.response.data)})
    
  }
 
  return (
    <>
      <Stack spacing={3}>
        <TextField    value={payload.username}
          onChange = {(e)=>setPayload({...payload,username:e.target.value})} label="Username" />

        <TextField
          label="Password"
          // {...password}
          value={payload.password}
          onChange = {(e)=>setPayload({...payload,password:e.target.value})}
          type={showPassword ? 'text' : 'password'}
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
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <LoadingButton fullWidth size="large" type="submit" variant="contained" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading}>
        Login
      </LoadingButton>
    </>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}


