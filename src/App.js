// project import
import { StrictMode } from 'react';
import Routes from './routes';
import ThemeCustomization from './themes';
import ScrollTop from './components/ScrollTop';
import { baseName } from './Constant/Constant';


import { BrowserRouter } from 'react-router-dom';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <BrowserRouter basename={baseName}>
    <ThemeCustomization>
      <ScrollTop>
        <StrictMode>
          <Routes />
        </StrictMode>
      </ScrollTop>
    </ThemeCustomization>
  </BrowserRouter>

);

export default App;
