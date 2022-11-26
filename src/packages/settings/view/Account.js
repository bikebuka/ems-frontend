import {Link, useNavigate} from "react-router-dom";
import Profile from "../components/Profile";
import {Breadcrumbs, Button, Card, CardContent, CardHeader, Divider, Grid, Typography} from "@mui/material";
import Page from "../../../components/Page";
import {Box} from "@mui/system";
import {ArrowLeft} from "@mui/icons-material";

export default function Account(props) {
    const navigate = useNavigate();
    return (
        <Page title="My Profile">
            <Box sx={{m:5}}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Dashboard
                    </Link>
                    <Typography color="text.primary">My Profile</Typography>
                </Breadcrumbs>
                <Divider />
            </Box>
            <Card sx={{m:5}}>
                <CardHeader/>
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
                <Profile/>
            </Card>
        </Page>
    )

}
