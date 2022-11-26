import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {Card, Container, Link, Stack, Typography} from '@mui/material';
// hooks
import { Box } from '@mui/system';
import useResponsive from '../../../shared/hooks/useResponsive';
// components
import Page from '../../../components/Page';
import Logo from '../../../assets/logo.png';
// sections
import { LoginForm } from '../../../components/sections/auth/login';
import {appName} from "../../../core/environment/environment";
import {ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";
import {verifyOTP} from "../store/AuthActions";
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
  const {hasSentOTP} = useSelector(state=> state.AuthReducer)
  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          {mdUp && (
              <Typography variant="body1" sx={{ mt: { md: -2 } }}>
                Not sure how it works? {''}
                <Link variant="subtitle2" target="_blank" href="https://docs.ebiashara.com/">
                  Read Our Documentation
                </Link>
              </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
            <SectionStyle>
              <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                Hi, Welcome Back
              </Typography>
              <img src={require('../../../assets/images/bgImg.jpg')} alt="login"/>
            </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <img src={require("../../../assets/logo.png")} alt="logo"/>
            {
              hasSentOTP ?
                  <Stack spacing={5} md={{m:"10px"}}>
                    <h3></h3>
                  </Stack> :
                  <>
                    <Typography variant="h4" gutterBottom>
                      Sign in to {appName}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 5 }}>Enter your details below.</Typography>
                  </>
            }

            <LoginForm />

            {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{' '}
                <Link variant="subtitle2" component={RouterLink} to="/register">
                  Get started
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
