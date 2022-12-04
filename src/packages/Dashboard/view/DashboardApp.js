import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
// sections

import AuthService from "../../../core/access-control/AuthService";
import {AppCurrentVisits, AppWebsiteVisits, AppWidgetSummary} from "../../../shared/components/sections/@dashboard/app";
import {useEffect} from "react";
import {getStatistics} from "../store/DashboardAction";
import {useDispatch, useSelector} from "react-redux";
import SpinnerLoader from "../../../shared/plugin/loader/SpinnerLoader";

// ----------------------------------------------------------------------
const profile=AuthService?.user
export default function DashboardAppPage() {
    const theme = useTheme();
    const dispatch=useDispatch()

    //
    const {stats,loading}=useSelector(state=>state.DashboardReducer)

    useEffect(()=>{
        dispatch(getStatistics())
    },[dispatch])

    return (
        <>
            {
                loading?
                    <SpinnerLoader/>:
                    <>
                        <Helmet>
                            <title> Dashboard | Zieteck</title>
                        </Helmet>

                        <Container maxWidth="xl">
                            <Typography variant="h6" sx={{ mb: 5 }}>
                                Hi {profile?.last_name}, Welcome back
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <AppWidgetSummary title="Pending Amount" value={stats?.pending_amount || 0} icon={'ic:outline-business'} />
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <AppWidgetSummary title="Properties/Units" value={stats?.total_properties} color="info" icon={'ri:bank-fill'} />
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <AppWidgetSummary title="Leases" value={stats?.total_leases} color="warning" icon={'carbon:types'} />
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <AppWidgetSummary title="Tenants" value={stats?.total_leases} color="error" icon={'material-symbols:group-work-outline'} />
                                </Grid>

                                <Grid item xs={12} md={6} lg={8}>
                                    <AppWebsiteVisits
                                        title="Period Billings"
                                        subheader="(+43%) than last year"
                                        chartLabels={[
                                            '01/01/2003',
                                            '02/01/2003',
                                            '03/01/2003',
                                            '04/01/2003',
                                            '05/01/2003',
                                            '06/01/2003',
                                            '07/01/2003',
                                            '08/01/2003',
                                            '09/01/2003',
                                            '10/01/2003',
                                            '11/01/2003',
                                        ]}
                                        chartData={[
                                            {
                                                name: 'August',
                                                type: 'column',
                                                fill: 'solid',
                                                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                                            },
                                            {
                                                name: 'September',
                                                type: 'area',
                                                fill: 'gradient',
                                                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                                            },
                                            {
                                                name: 'October',
                                                type: 'line',
                                                fill: 'solid',
                                                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                                            },
                                        ]}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <AppCurrentVisits
                                        title="Period Payments"
                                        chartData={[
                                            { label: 'August', value: 4344 },
                                            { label: 'September', value: 5435 },
                                            { label: 'October', value: 1443 },
                                            { label: 'November', value: 4443 },
                                        ]}
                                        chartColors={[
                                            theme.palette.primary.main,
                                            theme.palette.info.main,
                                            theme.palette.warning.main,
                                            theme.palette.error.main,
                                        ]}
                                    />
                                </Grid>
                            </Grid>
                        </Container>
                    </>
            }

        </>
    );
}
