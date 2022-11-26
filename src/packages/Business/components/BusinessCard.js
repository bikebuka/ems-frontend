import Page from "../../../shared/components/Page";
import {ToastContainer} from "react-toastify";
import {Box} from "@mui/system";
import {
    Breadcrumbs, Button,
    Card,
    CardContent,
    CardHeader, Divider,
    Grid,
    Link,
    MenuItem,
    Stack,
    Typography
} from "@mui/material";
import {decrypt} from "../../../shared/utils/helpers/helpers";
import {useNavigate, useParams} from "react-router-dom";
import {FormProvider, RHFTextField} from "../../../shared/components/hook-form";
import {banks} from "../../../shared/_mock/banks";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {ArrowLeft} from "@mui/icons-material";
//
const sendMoneySchema = Yup.object().shape({
    amount: Yup.mixed().required("Please enter amount"),
    receiver_number: Yup.string().required("Please enter account number/phone number"),
    channel_code: Yup.string().required("Please select provider"),
    channel: Yup.mixed().required("Please select a channel"),
    reason: Yup.mixed().required("Please give a reason for paying"),
});
//
const providers=[
    {
        value:"0",
        label:"SasaPay"
    },
    {
        value:"63902",
        label:"M-Pesa"
    },
]
//
const defaultValues={
    amount: "",
    receiver_number: "",
    ebiashiara_account_number: "",
    channel_code: "0",
    reason: "",
    currency_code:"KES",
}
//
export default function BusinessCard(){
    const params=useParams()
    const code=decrypt(params.code)
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [is_mobile_money,setSendMoneyChannel]=useState(false)
    //
    const methods = useForm({
        resolver: yupResolver(sendMoneySchema),
        defaultValues,
        mode: 'onChange'
    });
    //
    const {handleSubmit, getValues, reset, watch,setValue} = methods;
    //check if options change
    useEffect(() => {
        watch(value => {
            if (value.channel==='bank') {
                //not mobile
                setSendMoneyChannel(false)
            } else{
                setSendMoneyChannel(true)
            }
        })
    }, [watch]);

    //submit
    const onSendMoney= () => {
        //
        setValue('ebiashiara_account_number',decrypt(params.code))
    }
    //
    const onFailed = async () => {
        console.log(getValues())
    }
    //
    return (
        <Page title={"Send Money"}>
            <ToastContainer theme="colored"/>
            <Box  sx={{ m: 5 }} >
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Dashboard
                    </Link>
                    <Link underline="hover" color="inherit" href="/#">
                        My Accounts
                    </Link>
                    <Link underline="hover" color="inherit" href="/#">
                        {code}
                    </Link>
                    <Link underline="hover" color="inherit" href="/#">
                        Transactions
                    </Link>
                    <Typography color="text.primary"> Send Money</Typography>
                </Breadcrumbs>
                <Divider />
            </Box>
            <Grid container spacing={3}  alignItems="center" justifyContent="center">
                <Grid md={6} xs={6} xl={6} item>
                    <Card>
                        <CardHeader
                          title={<Button color="error" onClick={()=>navigate(-1)} variant="outlined"><ArrowLeft />Go Back</Button>}
                          sx={{m:3}}
                          action={
                            <h4>Send Money</h4>
                          }
                        />
                        <Divider/>
                        <CardContent>
                            <FormProvider methods={methods} onSubmit={handleSubmit(onSendMoney,onFailed)}>
                                <Stack spacing={2} mt={2}>
                                    <Stack spacing={3}>
                                        <RHFTextField
                                            autoFocus
                                            select
                                            label="Select Channel"
                                            rows={3} size={'medium'}
                                            name="channel">
                                            <MenuItem key={"mobile_money"} value={"mobile_money"}>Mobile Money</MenuItem>
                                            <MenuItem key={"mobile_money"} value={"bank"}>Bank</MenuItem>
                                        </RHFTextField>

                                        {
                                            is_mobile_money ?
                                                <RHFTextField
                                                    autoFocus
                                                    readonly
                                                    rows={3} size={'medium'}
                                                    name="receiver_number"
                                                    label="Enter Recipient Phone Number"
                                                />
                                                :
                                                <RHFTextField
                                                    autoFocus
                                                    readonly
                                                    rows={3} size={'medium'}
                                                    name="receiver_number"
                                                    label="Enter Recipient Bank Account"
                                                />
                                        }

                                    </Stack>
                                    <Stack spacing={3}>
                                        {
                                            is_mobile_money ?
                                                <RHFTextField
                                                    autoFocus
                                                    select
                                                    label="Select Mobile Money Provider"
                                                    rows={3} size={'medium'}
                                                    name="channel_code"
                                                >
                                                    {
                                                        providers?.map(row=>{
                                                            return (
                                                                <MenuItem key={row.value} value={row.value}>{row.label}</MenuItem>
                                                            )
                                                        })
                                                    }
                                                </RHFTextField>
                                                :
                                                <RHFTextField
                                                    autoFocus
                                                    select
                                                    label="Select Bank"
                                                    rows={3} size={'medium'}
                                                    name="channel_code"
                                                >
                                                    {
                                                        banks?.map(row=>{
                                                            return (
                                                                <MenuItem key={row.value} value={row.value}>{row.value}.{row.label}</MenuItem>
                                                            )
                                                        })
                                                    }
                                                </RHFTextField>

                                        }


                                    </Stack>
                                    <Stack spacing={3}>
                                        <RHFTextField
                                            autoFocus
                                            type="number"
                                            size={'medium'}
                                            name="amount"
                                            label="How much are you sending (KES)?"
                                        />
                                    </Stack>

                                    <Stack spacing={3}>
                                        <RHFTextField
                                            autoFocus
                                            multiline
                                            rows={3} size={'medium'}
                                            name="reason"
                                            label="Enter Reason For Sending Money"
                                        />
                                    </Stack>

                                    <Stack direction={{ sm: 'column', md: 'row' }} spacing={5} alignContent='space-between'>
                                        <Button type="submit" variant='contained' color={'primary'} >Submit</Button>
                                    </Stack>
                                </Stack>
                            </FormProvider>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Page>
    )
}