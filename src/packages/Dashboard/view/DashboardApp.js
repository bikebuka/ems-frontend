import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
// components
import {
    Grid,
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    Avatar,
    Breadcrumbs,
    Link,
    Divider, Button
} from '@mui/material';
import Page from '../../../components/Page';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import {getStatistics} from "../store/DashboardAction";
import SpinnerLoader from "../../../shared/plugin/loader/SpinnerLoader";
import MoneyIcon from '@mui/icons-material/Money';
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AppsIcon from '@mui/icons-material/Apps';
import {useNavigate} from "react-router-dom";
// import Label from '../components/Label';

// ----------------------------------------------------------------------

export default function DashboardApp() {
    const dispatch=useDispatch();
    const { statistics,loading} = useSelector(state=> state.dashboardStatsReducer)
    //
    const navigate=useNavigate();
    useEffect(()=>{
        dispatch(getStatistics())
    },[dispatch])
    //
    return (
        <Page title="Dashboard">
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Dashboard
                </Link>
                <Typography color="text.primary">Statistics</Typography>
            </Breadcrumbs>
            <Divider />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >

                {
                    loading ?
                        <Grid container sx={{justifyContent: 'center'}}> <SpinnerLoader/></Grid>
                        :
                        <Container maxWidth={false}>

                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    item
                                    md={4}
                                    lg={4}
                                    sm={6}
                                    xl={4}
                                    xs={12}
                                    spacing={3}
                                >
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Grid
                                                container
                                                spacing={3}
                                                sx={{ justifyContent: 'space-between' }}
                                            >
                                                <Grid item>
                                                    <Typography
                                                        color="textSecondary"
                                                        gutterBottom
                                                        variant="overline"
                                                    >
                                                        TOTAL APPLICATIONS
                                                    </Typography>
                                                    <Typography
                                                        color="textPrimary"
                                                        variant="h4"
                                                    >
                                                        {statistics && statistics['number_of_apps']}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Avatar
                                                        sx={{
                                                            backgroundColor: 'success.main',
                                                            height: 56,
                                                            width: 56
                                                        }}
                                                    >
                                                        <PeopleIcon />
                                                    </Avatar>
                                                </Grid>
                                            </Grid>
                                            <Divider />
                                            <Box
                                                sx={{
                                                    justifyContent: 'flex-end',
                                                    display: 'flex',
                                                    pt: 2
                                                }}
                                            >
                                                <Button
                                                    color="success"
                                                    endIcon={<ArrowRightIcon fontSize="small" />}
                                                    size="small"
                                                    onClick={()=>navigate("/dashboard/applications",{replace: true})}
                                                >
                                                    Overview
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid
                                    item
                                    md={4}
                                    lg={4}
                                    sm={6}
                                    xl={4}
                                    xs={12}
                                    spacing={3}
                                >
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Grid
                                                container
                                                spacing={3}
                                                sx={{ justifyContent: 'space-between'}}
                                            >
                                                <Grid item>
                                                    <Typography
                                                        color="textSecondary"
                                                        gutterBottom
                                                        variant="overline"
                                                    >
                                                        TOTAL ACCOUNTS
                                                    </Typography>
                                                    <Typography
                                                        color="textPrimary"
                                                        variant="h4"
                                                    >
                                                        {statistics && statistics['number_of_accounts']}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Avatar
                                                        sx={{
                                                            backgroundColor: 'primary.main',
                                                            height: 56,
                                                            width: 56
                                                        }}
                                                    >
                                                        <AppsIcon />
                                                    </Avatar>
                                                </Grid>
                                            </Grid>
                                            <Divider />
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                    pt: 1
                                                }}
                                            >
                                                <Button
                                                    color="primary"
                                                    endIcon={<ArrowRightIcon fontSize="small" />}
                                                    size="small"
                                                    onClick={()=>navigate("/dashboard/my-accounts",{replace: true})}
                                                >
                                                    Overview
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid
                                    item
                                    md={4}
                                    lg={4}
                                    sm={6}
                                    xl={4}
                                    xs={12}
                                    spacing={3}
                                >
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Grid
                                                container
                                                spacing={5}
                                                sx={{ justifyContent: 'space-between' }}
                                            >
                                                <Grid item>
                                                    <Typography
                                                        color="textSecondary"
                                                        gutterBottom
                                                        variant="overline"
                                                    >
                                                        TOTAL ACCOUNTS BALANCE
                                                    </Typography>
                                                    <Typography
                                                        color="textPrimary"
                                                        variant="h4"
                                                    >
                                                       KES {statistics && statistics['total_accounts_balance']}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Avatar
                                                        sx={{
                                                            backgroundColor: 'error.main',
                                                            height: 56,
                                                            width: 56
                                                        }}
                                                    >
                                                        <MoneyIcon />
                                                    </Avatar>
                                                </Grid>
                                            </Grid>
                                            <Divider />
                                            <Box
                                                sx={{
                                                    pt: 2,
                                                    display: 'flex',
                                                    justifyContent: 'flex-end'
                                                }}
                                            >
                                                <Button
                                                    color="error"
                                                    endIcon={<ArrowRightIcon fontSize="small" />}
                                                    size="small"
                                                >
                                                    Overview
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Container>
                }
            </Box>
        </Page>
    );
}
