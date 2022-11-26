import {
    Badge,
    Breadcrumbs,
    Button,
    Card, CardActions,
    CardContent, CardHeader,
    Divider, FormControl,
    Grid, Link, Modal, Paper, Table, TableBody,
    TableCell, TableContainer, TableRow, TextField,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import { ArrowLeft } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {StatementListHead} from "../../Statement";
import {encrypt, formatDate} from "../../../shared/utils/helpers/helpers";
import {Box} from "@mui/system";
import Page from "../../../components/Page";
import {confirmApplication, createApplication, getApplications, getScopes} from "../store/ApplicationAction";
import {getCustomerAccounts} from "../../MyAccounts/store/AccountAction";
import {addApplication} from "../service/ApplicationService";
import {ToastContainer} from "react-toastify";
import SpinnerLoader from "../../../shared/plugin/loader/SpinnerLoader";
import {Alert} from "@mui/lab";

export default function Applications() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const { applications,otp_sent, message,loading,processing} = useSelector(state => state.ApplicationReducer)
    const { scopes } = useSelector(state => state.ApplicationScopeReducer)
    const { customer_accounts} = useSelector(state => state.AccountReducer)
    //
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #fff',
        boxShadow: 24,
        p: 4,
    };
    //
    useEffect(()=> {
        dispatch(getApplications())
    },[dispatch])
    //accounts
    useEffect(() => {
        dispatch(getCustomerAccounts())
    }, [dispatch]);
    //callback URL
    useEffect(() => {
        dispatch(getScopes())
    }, [dispatch]);


    //
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //
    const environments=[
        {
            label: "Sandbox",
            value:"sandbox"
        },
        {
            label: "Production",
            value:"production"
        }
    ]
    //form
    const [submitted,setSubmitted]=useState(false);
    const [application_name,setApplicationName] = useState("")
    const [ebiashara_account_number,setAccount] = useState("")
    const [environment,setEnv] = useState("")
    const [application_scope_id,setScope] = useState("")
    const [callback_url,setCallbackURL] = useState("")
    const [otp,setOTP] = useState("")
    //payload
    let payload= {
        application_name,
        ebiashara_account_number,
        environment,
        application_scope_id,
        callback_url,
        otp
    }
    //
    const handleSubmit = () => {
        //
        if (environment==='sandbox') {
            setSubmitted(true)
            addApplication(dispatch,createApplication(payload))
            handleClose()
        } else{
            setSubmitted(true)
            if (otp_sent) {
                dispatch(confirmApplication(payload))
                setTimeout(()=> {
                    handleClose()
                },3000)
            }
            else{
                dispatch(createApplication(payload))
            }
        }
    }
    //
    const TABLE_HEAD=[
        // { id: 'id', label: 'Transaction ID', alignRight: false },
        { id: 'index', label:"#S/N", alignLeft: true},
        { id: 'date_created', label: 'Created On', alignLeft: true },
        { id: 'account_number', label: 'A/c Number', alignLeft: true },
        { id: 'account_name', label: 'A/c Name', alignLeft: true },
        { id: 'app_name', label: 'Name', alignRight: false },
        { id: 'app_scope', label: 'Scope', alignRight: false },
        { id: 'available_balance', label: 'Environment', alignRight: false },
        { id: 'category', label: 'Category', alignRight: false },
        { id: 'category', label: 'Customer', alignRight: false },
        { id: 'bal', label: 'Balance', alignRight: false },
        { id: 'status', label: 'Status', alignRight: false },
        { id: 'action', label: 'Action', alignRight: false },
    ]
    //
    return (
        <Page className="container" title="Applications">
            <ToastContainer theme="colored"/>
            <Box>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Dashboard
                    </Link>
                    <Typography color="text.primary">My Applications</Typography>
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
                                    <Button onClick={handleOpen} color="primary" variant="contained"><AddIcon />Add New</Button>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                <Card>
                                                    <CardHeader title="Create An Application"/>
                                                    {
                                                        submitted && otp_sent ?
                                                            <CardContent>
                                                                <Alert>{message}</Alert>
                                                            </CardContent>
                                                            : <></>
                                                    }
                                                    <CardContent>
                                                        <div>
                                                            <Paper>
                                                                <div sx={{p:5}}>
                                                                    <FormControl fullWidth>
                                                                        <TextField
                                                                            id="standard-error"
                                                                            label="Application Name"
                                                                            helperText="Enter your application name."
                                                                            variant="standard"
                                                                            focused
                                                                            value={application_name}
                                                                            onChange={(e)=>setApplicationName(e.target.value)}
                                                                        />
                                                                    </FormControl>
                                                                </div>
                                                                <div sx={{p:5}}>
                                                                    <FormControl fullWidth>
                                                                        <TextField
                                                                            id="standard-error-helper-text"
                                                                            label="Select Scope"
                                                                            select
                                                                            defaultValue="0"
                                                                            variant="standard"
                                                                            SelectProps={{
                                                                                native: true,
                                                                            }}
                                                                            helperText="Please select Scope"
                                                                            value={application_scope_id}
                                                                            onChange={(e)=>setScope(e.target.value)}
                                                                        >
                                                                            <option key='env'>Select Scope</option>
                                                                            {scopes && scopes.map((option) => (
                                                                                <option key={option["id"]} value={option["id"]}>
                                                                                    {option['scope_name']}
                                                                                </option>
                                                                            ))}
                                                                        </TextField>
                                                                    </FormControl>
                                                                </div>
                                                                <div sx={{p:5}}>
                                                                    <FormControl fullWidth>
                                                                        <TextField
                                                                            id="standard-error-helper-text"
                                                                            label="Select Environment"
                                                                            select
                                                                            defaultValue="0"
                                                                            variant="standard"
                                                                            SelectProps={{
                                                                                native: true,
                                                                            }}
                                                                            helperText="Please select your Environment"
                                                                            value={environment}
                                                                            onChange={(e)=>setEnv(e.target.value)}
                                                                        >
                                                                            <option key='env'>Select Environment</option>
                                                                            {environments.map((option) => (
                                                                                <option key={option.value} value={option.value}>
                                                                                    {option.label}
                                                                                </option>
                                                                            ))}
                                                                        </TextField>
                                                                    </FormControl>
                                                                </div>
                                                                <div sx={{p:5}}>
                                                                    <FormControl fullWidth>
                                                                        <TextField
                                                                            id="standard-error-helper-text"
                                                                            label="Select Account"
                                                                            select
                                                                            defaultValue="0"
                                                                            variant="standard"
                                                                            SelectProps={{
                                                                                native: true,
                                                                            }}
                                                                            helperText="Please select account"
                                                                            value={ebiashara_account_number}
                                                                            onChange={(e)=>setAccount(e.target.value)}
                                                                        >
                                                                            <option key='env'>Select Account</option>
                                                                            {customer_accounts && customer_accounts.map((option) => (
                                                                                <option key={option["account_number"]} value={option["account_number"]}>
                                                                                    {option["account_name"]}
                                                                                </option>
                                                                            ))}
                                                                        </TextField>
                                                                    </FormControl>
                                                                </div>
                                                                <div sx={{p:5}}>
                                                                    <FormControl fullWidth>
                                                                        <TextField
                                                                            type="url"
                                                                            id="standard-error-helper-text"
                                                                            label="Enter Callback URL"
                                                                            variant="standard"
                                                                            value={callback_url}
                                                                            helperText="Please enter callback URL"
                                                                            onChange={(e)=>setCallbackURL(e.target.value)}
                                                                        />
                                                                    </FormControl>
                                                                </div>
                                                                {
                                                                    otp_sent ?
                                                                        <div sx={{p:5}}>
                                                                            <FormControl fullWidth>
                                                                                <TextField
                                                                                    id="standard-error"
                                                                                    label="Enter OTP"
                                                                                    helperText="Enter your confirmation OTP."
                                                                                    variant="standard"
                                                                                    focused
                                                                                    error
                                                                                    value={otp}
                                                                                    onChange={(e)=>setOTP(e.target.value)}
                                                                                />
                                                                            </FormControl>
                                                                        </div> : <></>
                                                                }
                                                            </Paper>
                                                        </div>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Grid container sx={{m:2}} justifyContent="flex-end">
                                                           <Grid container md={6}>
                                                               <Button onClick={handleClose} color="error" variant="outlined">Cancel</Button>
                                                           </Grid>
                                                           <Grid container md={6} justifyContent="flex-end">
                                                               {
                                                                   processing ?
                                                                       <Button color="error" variant="contained">Processing...</Button>
                                                                       :
                                                                       <Button onClick={handleSubmit} color="primary" variant="outlined">Submit</Button>
                                                               }
                                                           </Grid>

                                                        </Grid>
                                                    </CardActions>
                                                </Card>
                                            </Typography>
                                        </Box>
                                    </Modal>
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
                                            <StatementListHead
                                                headLabel={TABLE_HEAD}
                                            />
                                            <TableBody>

                                                {applications ? applications.map((row,index) => {
                                                    const { id, date_created, application_name, application_scope, environment, status,ebiashara_account } = row;
                                                    const { account_category,customer,account_number,account_name,available_balance} = ebiashara_account;


                                                    return (
                                                        <TableRow
                                                            hover
                                                            key={id}
                                                            tabIndex={-1}
                                                            role="checkbox"
                                                        >

                                                            <TableCell align="left">{index+1}</TableCell>
                                                            <TableCell align="left">{formatDate(date_created)}</TableCell>
                                                            <TableCell align="left">{account_number}</TableCell>
                                                            <TableCell align="left">{account_name}</TableCell>
                                                            <TableCell align="left">{application_name}</TableCell>
                                                            <TableCell align="left">{application_scope['scope_name']}</TableCell>
                                                            <TableCell align="left">{environment}</TableCell>
                                                            <TableCell align="left">{account_category['name']}</TableCell>
                                                            <TableCell align="left">{customer['display_name']}</TableCell>
                                                            <TableCell align="center">{available_balance}</TableCell>
                                                            <TableCell align="center">
                                                                {
                                                                    (status===0 ) ?
                                                                        <span>
                                                                            <Badge badgeContent="Pending" color="warning"></Badge>
                                                                        </span> :
                                                                        status ===1 ?
                                                                            <Badge badgeContent="Active" color="success"></Badge> :
                                                                            status===2 ?
                                                                                <span><Badge badgeContent="Suspended" color="error"></Badge></span>
                                                                                : <></>
                                                                }
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <Button onClick={()=>navigate(`/dashboard/applications/card/${encrypt(id)}`,{replace:true})} variant="outlined" color="primary">View</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                }) : <></>}
                                            </TableBody>
                                        </Table>
                                }
                            </TableContainer>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Page>
    )
}