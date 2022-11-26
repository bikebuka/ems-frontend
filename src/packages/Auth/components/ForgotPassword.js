// @mui
import { styled } from '@mui/material/styles';
import {Card, Container, Stack, Typography} from '@mui/material';
// hooks
import useResponsive from '../../../shared/hooks/useResponsive';
// components
import Page from '../../../components/Page';
// sections
import {appName} from "../../../core/environment/environment";
import {useSelector} from "react-redux";
import ForgotPasswordForm from "./ForgotPasswordForm";
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
        alignItems: 'flex-start',
        padding: theme.spacing(7, 5, 0, 7),
    },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
    const smUp = useResponsive('up', 'sm');
    const {hasSentOTP,verified} = useSelector(state=> state.AuthReducer)
    const mdUp = useResponsive('up', 'md');

    return (
        <Page title="Reset Password">
            <RootStyle>
                <HeaderStyle>
                    {/* <Logo /> */}
                </HeaderStyle>

                {mdUp && (
                    <SectionStyle>
                        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                            Hi, Welcome Back
                        </Typography>
                        <img src={require("../../../assets/images/bgImg.jpg")} alt="login"/>
                    </SectionStyle>
                )}

                <Container maxWidth="sm">
                    <ContentStyle>
                        <img src={require("../../../assets/logo.png")} alt="logo"/>
                        {
                            hasSentOTP ?
                                <Stack spacing={5} md={{m:"10px"}}>
                                    <h3>Enter an OTP</h3>
                                </Stack> : verified ?
                                    <>
                                        <Typography variant="h4" gutterBottom>
                                            Set Your New {appName} Password
                                        </Typography>
                                        <Typography sx={{ color: 'text.secondary', mb: 5 }}>Create your new {appName} password</Typography>
                                    </>
                                :
                                <>
                                    <Typography variant="h4" gutterBottom>
                                        Forgot Your {appName} Password?
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary', mb: 5 }}>To reset your password, enter your National ID and Mobile Number.</Typography>
                                </>
                        }

                        <ForgotPasswordForm />

                    </ContentStyle>
                </Container>
            </RootStyle>
        </Page>
    );
}
