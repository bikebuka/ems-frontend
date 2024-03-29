import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {Card, Container, Link, Stack, Typography} from '@mui/material';
// hooks
import useResponsive from '../../../shared/hooks/useResponsive';
// components
import Page from '../../../shared/components/Page';
// sections
import { LoginForm } from '../../../shared/components/sections/auth/login';
import {useSelector} from "react-redux";
import {Box} from "@mui/system";
import {ToastContainer} from "react-toastify";
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
  backgroundColor:'#FAFAFA'
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
  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Login">
      <ToastContainer theme="colored"/>
      <RootStyle>

        {mdUp && (
            <SectionStyle>
              <Typography variant="h4" sx={{ px: 5, mt: 10, mb: 5 }}>
                Rental Management System
              </Typography>
              <img src={require('../../../assets/images/landing.png')} width={"100%"} height={"60%"} alt="login"/>
            </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <SectionStyle justifyItems="center">
              <Box sx={{m:'auto'}}>
                <img src={require("../../../assets/logo.jpeg")} alt="logo" width="50%"/>
              </Box>
              <Stack spacing={2}>
                <LoginForm />

                {!smUp && (
                    <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                      Don’t have an account?{' '}
                      <Link variant="subtitle2" component={RouterLink} to="/register">
                        Get started
                      </Link>
                    </Typography>
                )}
              </Stack>
            </SectionStyle>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
