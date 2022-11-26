import * as Yup from 'yup';
import { useEffect, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {Link} from "react-router-dom"
// @mui
import {Stack, IconButton, InputAdornment} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import {useDispatch, useSelector} from "react-redux";
import OTPInput from "otp-input-react";
import {toast, ToastContainer} from "react-toastify";
import {resetPassword, setNewPassword, verifyResetOTP} from "../store/AuthActions";
import SpinnerLoader from "../../../shared/plugin/loader/SpinnerLoader";
import {FormProvider, RHFCheckbox, RHFTextField} from "../../../components/hook-form";
import Iconify from "../../../components/Iconify";

// ----------------------------------------------------------------------

export default function ForgotPasswordForm() {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch=useDispatch()
    const {submitting,hasSentOTP,verifyingOTP,verified,set_password_page} = useSelector(state=> state.AuthReducer)
    //otp
    const [otp, setOTP] = useState("")
    const [new_password, setPasswordVal] = useState("")
    const [confirm_password, setConfirmPassword] = useState("")
    const notifyError = msg => {
        toast.error(msg)
    }
    //

    const LoginSchema = Yup.object().shape({
        id_number: Yup.string().required('Please provide a valid id number'),
        email: Yup.string().required('Email address is required'),
    });

    const defaultValues = {
        id_number: '',
        email: '',
        new_password: '',
        confirm_password: ''
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
        dispatch(resetPassword(payload))
    };
    //set password
    const setPassword= async (e) => {
        e.preventDefault()
        let payload=getValues();
        let data = {
            id_number: payload.id_number,
            email: payload.email,
            new_password
        };
        if (new_password !==confirm_password) {
            notifyError('Passwords do not match')
        }
        else{
            dispatch(setNewPassword(data))
        }
    }
    //verify
    useEffect(() => {
        let payload=getValues();
        if (otp.length===6) {
            let data = {
                id_number: payload.id_number,
                email: payload.email,
                otp
            };
            dispatch(verifyResetOTP(data))
        }
    }, [dispatch, getValues, otp]);
    //
    //
    return (
        <div>
            {
                verified ?
                    <FormProvider methods={methods} onSubmit={setPassword}>
                        <ToastContainer theme="colored"/>
                        <Stack spacing={3}>
                            <RHFTextField
                                name="password"
                                label="Enter Password"
                                value={new_password}
                                onChange={e=>setPasswordVal(e.target.value)}
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
                            <RHFTextField
                                name="confirm_password"
                                label="Confirm Password"
                                type={showPassword ? 'text' : 'password'}
                                value={confirm_password}
                                onChange={e=>setConfirmPassword(e.target.value)}
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
                            <Link to="/auth/login">
                                Sign in Instead?
                            </Link>
                        </Stack>

                        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={submitting}>
                            Set Password
                        </LoadingButton>
                    </FormProvider>
                    :
                hasSentOTP ?
                    <Stack spacing={3}>
                        <OTPInput
                            value={otp}
                            onChange={setOTP}
                            autoFocus
                            OTPLength={6}
                            otpType="number"
                            disabled={false}
                            secure
                        />
                        {
                            verifyingOTP ?
                                <SpinnerLoader/>
                                :<></>
                        }
                    </Stack>
                    :
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <ToastContainer theme="colored"/>
                        <Stack spacing={3}>
                            <RHFTextField name="id_number" label="ID Number" />
                            <RHFTextField
                                name="email"
                                label="Email Address"
                                type='text'
                            />
                        </Stack>
                        <Stack  direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                            <Link to="/auth/login">
                                Sign in Instead?
                            </Link>
                        </Stack>

                        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={submitting}>
                            Reset Password
                        </LoadingButton>
                    </FormProvider>
            }

        </div>
    );
}
