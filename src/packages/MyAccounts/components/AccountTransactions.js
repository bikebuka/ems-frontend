import {
    Avatar, Badge,
    Breadcrumbs,
    Button,
    Card, CardContent, CircularProgress, Container, CssBaseline, Dialog, DialogContent, DialogTitle,
    Divider, Grid, InputAdornment,
    Link, MenuItem, Paper, Slide, Stack, Table, TableBody,
    TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, Typography
} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import { ArrowLeft } from '@mui/icons-material';
import {ChangeEvent, forwardRef, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCustomerAccountTransactions, processTopupPayment, topUpAccount} from "../store/AccountAction";
import {decrypt, formatDate} from "../../../shared/utils/helpers/helpers";
import SendIcon from '@mui/icons-material/Send';
import {Box} from "@mui/system";
import Page from "../../../shared/components/Page";
import SpinnerLoader from "../../../shared/plugin/loader/SpinnerLoader";
import {ToastContainer} from "react-toastify";
//
import AddCardIcon from '@mui/icons-material/AddCard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {FormProvider, RHFTextField} from "../../../shared/components/hook-form";
import MuiPhoneNumber from "material-ui-phone-number";
import LockIcon from "@mui/icons-material/Lock";
import OTPInput from "otp-input-react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as Yup from "yup";
import {styled} from "@mui/material/styles";
//

const TopupSchema = Yup.object().shape({
    account_number: Yup.string().required("Please enter account number"),
    network_code: Yup.string().required("Please select provider e.g SasaPay"),
    currency_code: Yup.string().required("Please select currency"),
    amount: Yup.mixed().required("Please enter amount"),
});
//
//providers
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

const currencyCodes=[
    {
        name: "Kenyan Shillings",
        value:"KES"
    }
]
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
//


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#36454F",
        color: theme.palette.common.white,
        fontWeight: 600
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
//
export default function AccountTransactions() {
    //pagination (do not change)
    const [page, setPage] = useState(0);
    //items per page
    const [rowsPerPage, setRowsPerPage] = useState(10);
    //on pagination change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        let items=parseInt(event.target.value, 10);
        setRowsPerPage(items);
        setPage(0);
    };
    //params
    const params=useParams();
    //
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const { transactions,pagination, loading,customer_account} = useSelector(state => state.AccountReducer)
    //trans
    const code=decrypt(params.code);
    //
    useEffect(()=> {
        let payload={
            account_number: code,
            page:page+1,
            page_size: rowsPerPage
        }
        dispatch(getCustomerAccountTransactions(payload))
    },[code, dispatch,page,rowsPerPage])
    //form
    const {payment_initiated,is_sasapay,submitting} = useSelector(state => state.AccountReducer)
    //
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogAccountOpen, setDialogAccountOverview] = useState(false);
    const [mobile_number, setMobileNumber] = useState("");
    const [authorization_code, setAuthorizationCode] = useState("")
    //add account dialog
    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    const defaultValues={
        account_number: "",
        network_code: "0",
        mobile_number: "",
        country_code: "254",
        currency_code: "KES",
        amount: null
    }

    const methods = useForm({
        resolver: yupResolver(TopupSchema),
        defaultValues,
        mode: 'onChange'
    });
    //
    const {
        handleSubmit, getValues, setValue, reset,
        formState: { isSubmitting },
    } = methods;
    //add new account
    const openTopUpDialog = () => {
        setValue("account_number",code)
        setDialogOpen(true)
    }
    //on account overview
    const onAccountOverview = () => {
        setDialogAccountOverview(true)
    }
    //
    const onPhoneChange = value=> {
        setMobileNumber(value)
        setValue("mobile_number",mobile_number)
    }
    const onSubmit = async () => {

        setValue("mobile_number",mobile_number)
        setValue("country_code","254")
        await  dispatch(topUpAccount(getValues()))
    }
    const onFailed = async () => {
        console.log(getValues())
    }
    //process payment
    useEffect(() => {
        if (authorization_code.length===6 && payment_initiated!==undefined) {
            let payload = {
                account_number:code,
                authorization_code,
                page: 1,
                page_size:5,
                transaction_reference: payment_initiated?.transaction_reference,
                is_view_page: true
            };
            dispatch(processTopupPayment(payload))
            reset()
            setDialogOpen(false)
        }
    }, [authorization_code]);
    //
    return (
        <Page title="Transactions" className="container">
            <ToastContainer theme="colored"/>
            <Box  sx={{ m: 5 }} >
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Dashboard
                    </Link>
                    <Link underline="hover" color="inherit" href="/">
                        My Accounts
                    </Link>
                    <Link underline="hover" color="inherit" href="/">
                        {code}
                    </Link>
                    <Typography color="text.primary"> Transactions</Typography>
                </Breadcrumbs>
                <Divider />
            </Box>
            <Box sx={{m:5}}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography>
                            <Grid container spacing={2}>
                                <Grid item md={6}>
                                    <Button color="error" onClick={()=>navigate(-1)} variant="outlined"><ArrowLeft />Go Back</Button>
                                </Grid>
                                <Grid item md={6} container justifyContent="flex-end">
                                    <Grid item md={4} container> <Button onClick={()=>openTopUpDialog()} color="error" variant="contained"><AddCardIcon /> Top Up Account</Button></Grid>
                                    <Grid item md={4} container>
                                        <Button onClick={()=>onAccountOverview()} color="success" variant="contained"><AccountBoxIcon /> Account Overview</Button>
                                    </Grid>
                                    <Grid item container md={4}> <Button onClick={()=>navigate(`/dashboard/my-accounts/transactions/${params.code}/send-money`)} color="primary" variant="contained"><SendIcon /> Send Money</Button></Grid>
                                </Grid>
                            </Grid>
                        </Typography>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Grid  container spacing={2}>
                            <Grid item md={12}>
                                <Typography>
                                    <TableContainer sx={{ minWidth: 800 }}>
                                        {
                                            loading ?
                                                <Grid container sx={{justifyContent: 'center'}}> <SpinnerLoader/></Grid>
                                                :
                                                <Table>
                                                    <TableHead>
                                                        <StyledTableRow>
                                                            <StyledTableCell>#S/N</StyledTableCell>
                                                            <StyledTableCell>Created On</StyledTableCell>
                                                            <StyledTableCell>Transaction Code</StyledTableCell>
                                                            <StyledTableCell>Payment Type</StyledTableCell>
                                                            <StyledTableCell>Account Number</StyledTableCell>
                                                            <StyledTableCell>From->To</StyledTableCell>
                                                            <StyledTableCell>Amount</StyledTableCell>
                                                            <StyledTableCell>Customer</StyledTableCell>
                                                            <StyledTableCell>Description</StyledTableCell>
                                                            <StyledTableCell>Status</StyledTableCell>
                                                        </StyledTableRow>
                                                    </TableHead>
                                                    <TableBody>

                                                        {transactions ? transactions.map((row,index) => {
                                                            const { id, status, created_date, third_party_transaction_code, amount,
                                                                description,payment_detail } = row;
                                                            const { account_number,source_channel,destination_channel,display_name,payment_type} = payment_detail

                                                            return (
                                                                <StyledTableRow
                                                                    hover
                                                                    key={id}
                                                                    tabIndex={-1}
                                                                    role="checkbox"
                                                                >

                                                                    <StyledTableCell align="left">{index+1}</StyledTableCell>
                                                                    <StyledTableCell sizeSmall align="left">{formatDate(created_date)}</StyledTableCell>
                                                                    <StyledTableCell sizeSmall align="left">{third_party_transaction_code}</StyledTableCell>
                                                                    <StyledTableCell align="left">{payment_type['value']}</StyledTableCell>
                                                                    <StyledTableCell align="left">{account_number}</StyledTableCell>
                                                                    <StyledTableCell align="left">{source_channel}- {destination_channel}</StyledTableCell>
                                                                    <StyledTableCell align="left">{amount}</StyledTableCell>
                                                                    <StyledTableCell align="left">{display_name}</StyledTableCell>
                                                                    <StyledTableCell align="left">{description}</StyledTableCell>
                                                                    <StyledTableCell align="left">{status===1 ? <Badge badgeContent="Completed" color="success"></Badge> : status===0 ?<Badge badgeContent="Pending" color="warning"></Badge>: <Badge badgeContent="Suspended" color="error"></Badge>}</StyledTableCell>
                                                                </StyledTableRow>
                                                            )
                                                        }) : <>No items found</>}
                                                        {
                                                            transactions && transactions.length <1 ? <>No transactions found </> : <></>
                                                        }
                                                    </TableBody>
                                                </Table>
                                        }
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25,50]}
                                        component="div"
                                        count={pagination?.transactions_count}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        rowsPerPage={rowsPerPage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        variant="outlined"
                                        color="primary"
                                    />
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Dialog
                    open={dialogOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    fullWidth="md"
                    onClose={handleDialogClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{is_sasapay ? "Verify SasaPay Transaction" : "Top Up Account"}</DialogTitle>
                    <DialogContent>
                        {
                            (!is_sasapay) ?
                                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit,onFailed)}>
                                    <Stack spacing={2} mt={2}>
                                        <Stack spacing={3}>
                                            <RHFTextField
                                                autoFocus
                                                readonly
                                                rows={3} size={'medium'}
                                                name="account_number"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">Account Number</InputAdornment>,
                                                }}
                                            />
                                            <RHFTextField
                                                rows={3} size={'medium'}
                                                name="network_code"
                                                select
                                                label='Select provider'>
                                                {

                                                    providers?.map(row=> {
                                                        return (
                                                            <MenuItem key={row.value} value={row.value}>{row.label}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </RHFTextField>
                                        </Stack>
                                        <Stack spacing={3}>
                                            <RHFTextField select rows={3} size={'medium'} name="currency_code" label='Select Currency'>
                                                {
                                                    currencyCodes?.map(row=> {
                                                        return (
                                                            <MenuItem key={row.value} value={row.value}>{row.name}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </RHFTextField>
                                            <RHFTextField rows={3} size={'medium'} name="amount" label='Amount' />
                                        </Stack>
                                        <Stack spacing={3}>
                                            <MuiPhoneNumber onlyCountries={['ke']} value={mobile_number} onChange={onPhoneChange} name={"mobile_number"} label="Phone Number" defaultCountry={'ke'} variant="outlined"/>
                                        </Stack>

                                        <Stack direction={{ sm: 'column', md: 'row' }} spacing={5} alignContent='space-between'>
                                            <Button sx={{display:isSubmitting?'none':''}} variant='outlined' color="error" size='medium' onClick={() => setDialogOpen(false)}>Dismiss</Button>
                                            {
                                                isSubmitting ?
                                                    <Button type="submit" variant='outlined' color={'error'} size='medium' ><CircularProgress color="error" size={15}/> Processing...</Button>
                                                    :
                                                    <Button type="submit" variant='contained' color={'primary'} >Pay Now</Button>

                                            }
                                        </Stack>
                                    </Stack>
                                </FormProvider>
                                :

                                <Container component="main" maxWidth="sm">
                                    <CssBaseline />
                                    <div>
                                        <Grid
                                            container
                                            style={{ backgroundColor: "white" }}
                                            justify="center"
                                            alignItems="center"
                                            spacing={3}
                                        >
                                            <Grid item container justify="center">
                                                <Grid item container alignItems="center" direction="column">
                                                    <Grid item>
                                                        <Avatar>
                                                            <LockIcon color="error"/>
                                                        </Avatar>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography component="h1" variant="h5">
                                                            Verification Code
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} textAlign="center">
                                                <Paper elevation={0}>
                                                    <Typography variant="h6">
                                                        Please enter the verification code sent to your mobile
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                container
                                                justify="center"
                                                alignItems="center"
                                                direction="column"
                                            >
                                                <Grid item spacing={3} justify="center">
                                                    <OTPInput
                                                        autoFocus
                                                        OTPLength={6}
                                                        value={authorization_code}
                                                        onChange={setAuthorizationCode}
                                                        otpType="number"
                                                        disabled={false}
                                                        secure
                                                        separator={
                                                            <span>-</span>
                                                        }
                                                        inputStyle={{
                                                            width: "4rem",
                                                            height: "5rem",
                                                            margin: "0 1rem",
                                                            fontSize: "2rem",
                                                            borderRadius: 4,
                                                            border: "1px solid rgba(0,0,0,0.3)"
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Container>
                        }
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={dialogAccountOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    fullWidth="md"
                    onClose={handleDialogClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Account Overview"}</DialogTitle>
                    <DialogContent>
                        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit,onFailed)}>
                            <Stack spacing={2} mt={2}>
                                <Stack spacing={3}>
                                    <RHFTextField
                                        autoFocus
                                        readonly
                                        rows={3} size={'medium'}
                                        name="account_name"
                                        value={customer_account?.account_name}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">Account Name</InputAdornment>,
                                        }}
                                    />
                                    <RHFTextField
                                        autoFocus
                                        readonly
                                        rows={3} size={'medium'}
                                        name="account_number"
                                        value={customer_account?.account_number}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">Account Number</InputAdornment>,
                                        }}
                                    />

                                </Stack>
                                <Stack spacing={3} direction="row">
                                    <RHFTextField
                                        autoFocus
                                        readonly
                                        rows={3} size={'medium'}
                                        name="available_balance"
                                        value={customer_account?.available_balance}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">Available Balance</InputAdornment>,
                                        }}
                                    />
                                    <RHFTextField
                                        autoFocus
                                        readonly
                                        rows={3} size={'medium'}
                                        name="amount_on_hold"
                                        value={customer_account?.amount_on_hold}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">Amount on Hold</InputAdornment>,
                                        }}
                                    />

                                </Stack>

                                <Stack direction={{ sm: 'column', md: 'row' }} spacing={5} alignContent='space-between'>
                                    <Button variant='outlined' color="error" size='medium' onClick={() => setDialogAccountOverview(false)}>Dismiss</Button>
                                </Stack>
                            </Stack>
                        </FormProvider>
                    </DialogContent>
                </Dialog>
            </Box>
        </Page>
    )
}