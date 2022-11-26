// routes
import Router from './routes/routes';
import 'react-toastify/dist/ReactToastify.css';
// theme
import ThemeProvider from './shared/theme';
// components
import ScrollToTop from './shared/components/ScrollToTop';
import { BaseOptionChartStyle } from './shared/components/chart/BaseOptionChart';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
