import AuthService from "../../../core/access-control/AuthService";
import Page from "../../../components/Page";
import {Box} from "@mui/system";
import {Card, CardContent, CardHeader, Divider, FormControl, Grid, TextField} from "@mui/material";
import {formatDate} from "../../../shared/utils/helpers/helpers";

export default function Profile(){
    const user = AuthService.user
    return (
        <Page title="Account Settings">
            <Box className="text-start">
                <Card>
                    <CardHeader/>
                    <CardContent>
                        <Grid spacing={3} container>
                            <Grid item spacing={5} sx={4} md={4} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="First Name"
                                        variant="standard"
                                        readonly
                                        value={user.first_name}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item spacing={5} sx={4} md={4} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Middle Name"
                                        variant="standard"
                                        readonly
                                        value={user.middle_name}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item spacing={5} sx={4} md={4} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Last Name"
                                        variant="standard"
                                        readonly
                                        value={user.last_name}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider/>
                    <CardContent>
                        <Grid spacing={3} container>
                            <Grid item spacing={5} sx={4} md={4} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Email Address"
                                        variant="standard"
                                        readonly
                                        value={user.email}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item spacing={5} sx={4} md={4} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Display Name "
                                        variant="standard"
                                        readonly
                                        value={user["display_name"]}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item spacing={5} sx={4} md={4} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Mobile Number"
                                        variant="standard"
                                        readonly
                                        value={user.mobile_number}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider/>
                    <CardContent>
                        <Grid spacing={3} container>
                            <Grid item spacing={5} sx={3} md={3} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Document Number"
                                        variant="standard"
                                        readonly
                                        value={user['document_number']}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item spacing={5} sx={3} md={3} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Account Type "
                                        variant="standard"
                                        readonly
                                        value={user["customer_type"]}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item spacing={5} sx={3} md={3} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Role"
                                        variant="standard"
                                        readonly
                                        value={user['user'].role?.short_name}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item spacing={5} sx={3} md={3} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Joined On"
                                        variant="standard"
                                        readonly
                                        value={formatDate(user['date_created'])}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </Page>
    );
}