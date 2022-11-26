import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {Link} from "react-router-dom"
// @mui
import {
    Stack,
    IconButton,
    InputAdornment,
    Typography, Divider
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../hook-form';
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../../../../packages/Auth/store/AuthActions";
import {ToastContainer} from "react-toastify";
import {Box} from "@mui/system";
import {appName} from "../../../../../core/environment/environment";

// ----------------------------------------------------------------------

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch=useDispatch()
    const {submitting} = useSelector(state=> state.AuthReducer)
    //

    const LoginSchema = Yup.object().shape({
        email: Yup.string().required('Please provide a valid username'),
        password: Yup.string().required('Password is required'),
    });

    const defaultValues = {
        email: '',
        password: '',
    };

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });
    const {handleSubmit, getValues} = methods;

    // Formik will show submitting loader automatically
    const onSubmit = async () => {
        const payload = getValues()
        //send
        dispatch(login(payload))
    };
    //
    return (
        <div>
            <Box sx={{m:2}}>
                <Stack>
                    <Typography variant="h4" gutterBottom sx={{m:'auto'}}>
                        -  Sign in to {appName} -
                    </Typography>
                    <Divider/>
                    <Typography sx={{ color: 'text.secondary', mb: 5 }}>Your RMS adventure starts now.</Typography>
                </Stack>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3}>
                        <RHFTextField name="email" label="Email Address" />
                        <RHFTextField
                            name="password"
                            label="Password"
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
                    <Stack  direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                        <RHFCheckbox name="remember" label="Remember me" />
                        <Link to="/auth/forgot-password">
                            Forgot password?
                        </Link>
                    </Stack>

                    {
                        submitting ?
                            <LoadingButton fullWidth size="medium" color="warning" variant="contained">
                                Signing in...Please Wait
                            </LoadingButton>
                            :
                            <LoadingButton fullWidth size="large" type="submit" variant="contained">
                                Sign In
                            </LoadingButton>
                    }
                </FormProvider>
            </Box>

        </div>
    );
}
