import {
    Avatar, Badge,
    Breadcrumbs,
    Button,
    Card,
    CardContent, CircularProgress, Container, CssBaseline, Dialog, DialogContent, DialogTitle,
    Divider,
    Grid, IconButton, InputAdornment,
    Link, Menu, MenuItem, Paper, Slide, Stack, Table, TableBody,
    TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow,
} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import {useNavigate} from "react-router-dom";
import { ArrowLeft } from '@mui/icons-material';
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";
import {forwardRef, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCustomerAccounts, processTopupPayment, topUpAccount} from "../store/AccountAction";
import {StatementListHead} from "../../Statement";
import {encrypt, formatDate} from "../../../shared/utils/helpers/helpers";
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Box} from "@mui/system";
import Page from "../../../components/Page";
import SpinnerLoader from "../../../shared/plugin/loader/SpinnerLoader";
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import {FormProvider, RHFTextField} from "../../../components/hook-form";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as Yup from "yup";
import MuiPhoneNumber from 'material-ui-phone-number';
import OTPInput from "otp-input-react";
import {ToastContainer} from "react-toastify";
import {ChangeEvent} from "react";
import { Pagination, Typography } from "@mui/material";
import {styled} from "@mui/material/styles";
//


//

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
//

const TopupSchema = Yup.object().shape({
    account_number: Yup.string().required("Please enter account number"),
    network_code: Yup.string().required("Please select provider e.g SasaPay"),
    mobile_number: Yup.string().required("Please enter mobile number"),
    currency_code: Yup.string().required("Please select currency"),
    amount: Yup.mixed().required("Please enter amount"),
});
const currencyCodes=[
    {
        name: "Kenyan Shillings",
        value:"KES"
    }
]
const providers=[
    {
        name:"SasaPay",
        value:"0"
    },
    {
        name: "M-Pesa",
        value:"63902"
    },
    {
        name: "Card",
        value:"63908"
    }
]

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


export default function CustomerAccounts() {
    //table menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const [dialogOpen, setDialogOpen] = useState(false);
    const [mobile_number, setMobileNumber] = useState("");
    const [authorization_code, setAuthorizationCode] = useState("")
    const [account_number, setAccountNumber] = useState("")
    //
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {payment_initiated,is_sasapay,pagination,processing, customer_accounts, loading,error} = useSelector(state => state.AccountReducer)
    //pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    //
    useEffect(()=> {
        let payload= {
            page: page+1,
            page_size: rowsPerPage
        }
        dispatch(getCustomerAccounts(payload))
    },[dispatch,page,rowsPerPage])
    //
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent,value) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    //end pagination
    //redirect
    const redirect= (account_number) => {
        navigate(`/dashboard/my-accounts/transactions/${encrypt(account_number)}`,{ replace: true})
    }
    //form handle
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
        handleSubmit, getValues, setValue, reset, watch,
        formState: { isSubmitting },
    } = methods;
    //add new account
    const openTopUpDialog = (account) => {
        setDialogOpen(true)
        setValue("account_number",account.account_number)
        setAccountNumber(account.account_number)
    }
    const onPhoneChange = value=> {
        setMobileNumber(value)
        setValue("mobile_number",mobile_number)
    }
    const onSubmit = async () => {
        setValue("mobile_number",mobile_number)
        await  dispatch(topUpAccount(getValues()))
    }
    const onFailed = async () => {
        console.log(getValues())
    }
    //process payment
    useEffect(() => {
        if (authorization_code.length===6 && payment_initiated!==undefined) {
            let payload = {
                account_number,
                authorization_code,
                transaction_reference: payment_initiated?.transaction_reference,
            };
            dispatch(processTopupPayment(payload))
            setDialogOpen(false)
        }
    }, [authorization_code]);

    //
    return (
        <Page className="container" title="Accounts">
            <ToastContainer theme="colored"/>
            <Box sx={{m:5}}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Dashboard
                    </Link>
                    <Typography color="text.primary">My Accounts</Typography>
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
                            </Grid>
                        </Typography>
                    </CardContent>
                    <Divider />
                    <CardContent>
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
                                                    <StyledTableCell>Account Number</StyledTableCell>
                                                    <StyledTableCell>Account Name</StyledTableCell>
                                                    <StyledTableCell>Total Balance</StyledTableCell>
                                                    <StyledTableCell>Amount On Hold</StyledTableCell>
                                                    <StyledTableCell>Notification Number</StyledTableCell>
                                                    <StyledTableCell>Status</StyledTableCell>
                                                    <StyledTableCell>Actions</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>

                                                {customer_accounts ? customer_accounts.map((row,index) => {
                                                    const { id,status, date_created, account_number, account_name, available_balance, amount_on_hold, notification_number } = row;


                                                    return (
                                                        <StyledTableRow
                                                            hover
                                                            key={id}
                                                            tabIndex={-1}
                                                            role="checkbox"
                                                        >

                                                            <StyledTableCell align="left">{index+1}</StyledTableCell>
                                                            <StyledTableCell align="left">{formatDate(date_created)}</StyledTableCell>
                                                            <StyledTableCell align="left">{account_number}</StyledTableCell>
                                                            <StyledTableCell align="left">{account_name}</StyledTableCell>
                                                            <StyledTableCell align="center">{available_balance}</StyledTableCell>
                                                            <StyledTableCell align="center">{amount_on_hold}</StyledTableCell>
                                                            <StyledTableCell align="left">{notification_number}</StyledTableCell>
                                                            <StyledTableCell align="left">{status===1 ? <Badge badgeContent="Active" color="success"></Badge> : status===0 ?<Badge badgeContent="Inactive" color="warning"></Badge>: <Badge badgeContent="Suspended" color="error"></Badge>}</StyledTableCell>
                                                            <StyledTableCell align="left">
                                                                <PopupState variant="popover" popupId="demo-popup-menu">
                                                                    {(popupState) => (
                                                                        <>
                                                                            <IconButton
                                                                                aria-label="more"
                                                                                id="long-button"
                                                                                aria-controls={open ? 'long-menu' : undefined}
                                                                                aria-expanded={open ? 'true' : undefined}
                                                                                aria-haspopup="true"
                                                                                onClick={handleClick}
                                                                                {...bindTrigger(popupState)}
                                                                            >
                                                                                <MoreVertIcon />
                                                                            </IconButton>
                                                                            <Menu {...bindMenu(popupState)}>
                                                                                <MenuItem color="success" onClick={() => redirect(account_number)}> <VisibilityIcon color="success" fontSize="small"/> View Transactions</MenuItem>
                                                                                <MenuItem color="success" onClick={() => openTopUpDialog(row)}> <VerticalAlignTopIcon color="error" fontSize="small"/> Top Up</MenuItem>
                                                                            </Menu>
                                                                        </>
                                                                    )}
                                                                </PopupState>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    )
                                                }) : <> No items found</>}
                                            </TableBody>
                                        </Table>
                                }
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25,50]}
                                component="div"
                                count={pagination?.count}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                variant="outlined"
                                color="primary"
                            />
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
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
                                                        <MenuItem key={row.value} value={row.value}>{row.name}</MenuItem>
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
        </Page>
    )
}