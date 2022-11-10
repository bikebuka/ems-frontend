import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import call from '../../../core/services/http';
// components
import Iconify from '../../../components/iconify';
// eslint-disable-next-line import/no-unresolved, import/extensions, import/no-absolute-path
import { setUserSession } from '../../../utils/Common';
 

// ----------------------------------------------------------------------

export default function LoginForm(props) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);


  

  //  // handle button click of login form
  //  const handleLogin = () => {
  //   props.history.push('/dashboard');
  // }
 
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'X-Auth-Token': '97e0d315477f435489cf04904c9d0e6co',
    };
    const payload={
      username,
      password
    }

  call("post", 'login' , {payload})
  .then(res =>{console.log(res)}).catch(err => { 
    console.log(err.response.data)})
    // call("post",'login',{payload})
    // .then(res=>{
    //   console.log(res)
    // })
    // .then(err=>{
    //   console.log(err.response.data)
    // })
  }
 

  // const handleClick = () => {
  //   navigate('/dashboard', { replace: true });
  // };

  return (
    <>
      <Stack spacing={3}>
        <TextField   {...username} label="Username" />

        <TextField
          label="Password"
          {...password}
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


