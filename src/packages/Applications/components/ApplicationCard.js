import {useDispatch, useSelector} from "react-redux";
import {
    confirmApplication,
    createApplication,
    getApplication,
    getApplications,
    getScopes
} from "../store/ApplicationAction";
import {useParams} from "react-router-dom";
import {decrypt, formatDate} from "../../../shared/utils/helpers/helpers";
import {useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";
import {Box} from "@mui/system";
import AddIcon from '@mui/icons-material/Add';
import {
    Accordion, AccordionDetails, AccordionSummary,
    Avatar, Badge,
    Breadcrumbs, Button,
    Card, CardActions,
    CardContent,
    CardHeader, createStyles,
    Divider, FormControl, FormControlLabel, FormGroup,
    Grid, InputAdornment, Link, List, ListItem, ListItemAvatar, ListItemText, Modal, Paper, Stack, Switch,
    TextField,
    Typography
} from "@mui/material";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Page from "../../../components/Page";
import SpinnerLoader from "../../../shared/plugin/loader/SpinnerLoader";
import {Theme} from "@mui/material";
import {styled} from "@mui/material/styles";
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {AccountCircle} from "@mui/icons-material";
import {style} from "redux-logger/src/diff";
import {addApplication} from "../service/ApplicationService";
import {getCustomerAccounts} from "../../MyAccounts/store/AccountAction";
import {Alert} from "@mui/lab";
const useStyles = styled((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexWrap: "wrap",
            "& > *": {
                margin: theme.spacing(3),
            },
        },
    })
);


export default function ApplicationCard() {
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
    const classes = useStyles();
    const dispatch=useDispatch()
    const {applications,loading,processing,otp_sent,message}=useSelector(state => state.ApplicationReducer)
    const { scopes } = useSelector(state => state.ApplicationScopeReducer)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
    const { customer_accounts} = useSelector(state => state.AccountReducer)
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
    useEffect(() => {
        dispatch(getApplications())
    }, [dispatch]);
    //accounts
    useEffect(() => {
        let payload= {
            page: 1,
            page_size: 50
        }
        dispatch(getCustomerAccounts(payload))
    }, [dispatch]);
    //
    useEffect(() => {
        dispatch(getScopes())
    }, [dispatch]);

    return (
        <>
            <Page className="container" title="Applications Details">
                <ToastContainer theme="colored"/>
                <Box sx={{m:5}}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            Dashboard
                        </Link>
                        <Typography color="text.primary">My Applications</Typography>
                    </Breadcrumbs>
                    <Divider />
                </Box>
                <Box>
                    <Card>
                        <CardHeader
                            subheader={
                                <span>
                                     <AppSettingsAltIcon fontSize="small" color="success"/>-Live
                                     <AppSettingsAltIcon fontSize="small" color="primary"/>-Sandbox
                                </span>
                            }
                            action={
                            <>
                                <Stack spacing={3} sx={{mb:1}}>
                                    <Button onClick={handleOpen} color="primary" variant="contained"><AddIcon />Add New</Button>
                                </Stack>
                                </>
                            }/>
                        <Divider/>
                        {
                            loading ?
                                <Grid container sx={{justifyContent: 'center'}}> <SpinnerLoader/></Grid>
                                :
                                <>
                                    <CardContent>
                                        <Grid container spacing={3}>
                                            {
                                                applications?.map((row,index)=> {
                                                    const { id, date_created,
                                                        application, application_scope, environment, status,ebiashara_account } = row;
                                                    const {account_number,account_name,available_balance} = ebiashara_account;
                                                    const { name="",client_id="",client_secret=""} = application===null ? {} : application;
                                                    return <>
                                                        <Grid
                                                            item
                                                            lg={4}
                                                            sm={4}
                                                            xl={4}
                                                            xs={12}
                                                            spacing={3}
                                                            md={4}>

                                                            <Box className={classes.root}>
                                                                <Card>
                                                                    {
                                                                        environment && environment==='sandbox' ?
                                                                            <CardHeader
                                                                                avatar={<AppSettingsAltIcon color="primary"/>}
                                                                                title={`${name.toUpperCase()} APP`}
                                                                                subheader={account_name.toUpperCase()+'-'+account_number}
                                                                                action={
                                                                                    <CardActions>
                                                                                        <strong>SANDBOX</strong>
                                                                                        <MoreVertIcon/>
                                                                                    </CardActions>
                                                                                }
                                                                            />
                                                                            :
                                                                            <CardHeader
                                                                                avatar={<AppSettingsAltIcon color="success"/>}
                                                                                title={`${name.toUpperCase()} APP`}
                                                                                subheader={account_name.toUpperCase()+'-'+account_number}
                                                                                action={
                                                                                    <CardActions>
                                                                                        <strong>LIVE</strong>
                                                                                        <MoreVertIcon/>
                                                                                    </CardActions>
                                                                                }
                                                                            />
                                                                    }
                                                                    <CardContent>
                                                                        <div>
                                                                            <Divider/>
                                                                            <Grid container spacing={3} sx={{pr:2}}>
                                                                                <Grid item
                                                                                      lg={8}
                                                                                      sm={8}
                                                                                      xl={8}
                                                                                      xs={12}
                                                                                      md={8}
                                                                                      sx={{fontSize: 12}}
                                                                                >
                                                                                    <Box>
                                                                                        <small color="secondary" >Created on {formatDate(date_created)}</small>
                                                                                    </Box>
                                                                                </Grid>
                                                                                <Grid item
                                                                                      lg={4}
                                                                                      sm={4}
                                                                                      xl={4}
                                                                                      xs={12}
                                                                                      md={4}
                                                                                      container
                                                                                      justifyContent="flex-end"
                                                                                      sx={{fontSize: 14}}
                                                                                >
                                                                                    <Box>
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
                                                                                    </Box>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid container>
                                                                                <Grid item
                                                                                      lg={8}
                                                                                      sm={8}
                                                                                      xl={8}
                                                                                      xs={12}
                                                                                      md={8}
                                                                                      sx={{fontSize: 12}}
                                                                                >
                                                                                    <Box sx={{mt:2}}>
                                                                                        <small color="secondary" >Scopes: <strong>{application_scope?.scope_name}</strong></small>
                                                                                    </Box>
                                                                                </Grid>
                                                                                <Grid item
                                                                                      lg={4}
                                                                                      sm={4}
                                                                                      xl={4}
                                                                                      xs={12}
                                                                                      container
                                                                                      justifyContent="flex-end"
                                                                                      md={4}
                                                                                      sx={{fontSize: 14}}
                                                                                >
                                                                                    <Box sx={{mt:2}}>
                                                                                        <small color="secondary" >Balance: <strong>{available_balance}</strong></small>
                                                                                    </Box>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Divider/>
                                                                            <Accordion>
                                                                                <AccordionSummary
                                                                                    expandIcon={<ExpandMoreIcon />}
                                                                                    aria-controls="panel1a-content"
                                                                                    id="panel1a-header"
                                                                                >
                                                                                    <p>Show Client ID/Secret</p>
                                                                                </AccordionSummary>
                                                                                <AccordionDetails>
                                                                                    <Typography>
                                                                                        <FormControl fullWidth>
                                                                                            <TextField
                                                                                                id="input-with-icon-textfield"
                                                                                                label="Client ID"
                                                                                                disabled
                                                                                                aria-readonly
                                                                                                value={client_id}
                                                                                                InputProps={{
                                                                                                    startAdornment: (
                                                                                                        <InputAdornment position="start">
                                                                                                            <ContentPasteIcon />
                                                                                                        </InputAdornment>
                                                                                                    ),
                                                                                                }}
                                                                                                variant="standard"
                                                                                            />
                                                                                        </FormControl>
                                                                                    </Typography>
                                                                                    <Typography>
                                                                                        <FormControl fullWidth>
                                                                                            <TextField
                                                                                                id="input-with-icon-textfield"
                                                                                                label="Client Secret"
                                                                                                disabled
                                                                                                value={client_secret}
                                                                                                InputProps={{
                                                                                                    startAdornment: (
                                                                                                        <InputAdornment position="start">
                                                                                                            <ContentPasteIcon />
                                                                                                        </InputAdornment>
                                                                                                    ),
                                                                                                }}
                                                                                                variant="standard"
                                                                                            />
                                                                                        </FormControl>
                                                                                    </Typography>
                                                                                </AccordionDetails>
                                                                            </Accordion>
                                                                        </div>
                                                                    </CardContent>
                                                                </Card>
                                                            </Box>
                                                        </Grid>
                                                    </>
                                                })
                                            }

                                        </Grid>
                                    </CardContent>
                                </>
                        }
                    </Card>
                </Box>
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
                                                        variant="standard"
                                                        focused
                                                        value={application_name}
                                                        onChange={(e)=>setApplicationName(e.target.value)}
                                                    />
                                                </FormControl>
                                            </div>
                                            <div>
                                                <FormControl fullWidth sx={{mt:3}}>
                                                    <TextField
                                                        id="standard-error-helper-text"
                                                        label="Select Scope"
                                                        select
                                                        defaultValue="0"
                                                        variant="standard"
                                                        SelectProps={{
                                                            native: true,
                                                        }}
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
                                            <div>
                                                <FormControl fullWidth sx={{mt:3}}>
                                                    <TextField
                                                        id="standard-error-helper-text"
                                                        label="Select Environment"
                                                        select
                                                        defaultValue="0"
                                                        variant="standard"
                                                        SelectProps={{
                                                            native: true,
                                                        }}
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
                                            <div>
                                                <FormControl fullWidth sx={{mt:3}}>
                                                    <TextField
                                                        id="standard-error-helper-text"
                                                        label="Select Account"
                                                        select
                                                        defaultValue="0"
                                                        variant="standard"
                                                        SelectProps={{
                                                            native: true,
                                                        }}
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
                                            <div>
                                                <FormControl fullWidth sx={{mt:3}}>
                                                    <TextField
                                                        type="url"
                                                        id="standard-error-helper-text"
                                                        label="Enter Callback URL"
                                                        variant="standard"
                                                        value={callback_url}
                                                        onChange={(e)=>setCallbackURL(e.target.value)}
                                                    />
                                                </FormControl>
                                            </div>
                                            {
                                                otp_sent ?
                                                    <div>
                                                        <FormControl fullWidth sx={{mt:3}}>
                                                            <TextField
                                                                id="standard-error"
                                                                label="Enter OTP"
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
            </Page>
        </>
    )
}