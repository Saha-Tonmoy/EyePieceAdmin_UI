// project import
import Routes from './routes';
import ThemeCustomization from './themes';
import ScrollTop from './components/ScrollTop';

import { BrowserRouter } from 'react-router-dom';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <BrowserRouter>
    <ThemeCustomization>
      <ScrollTop>
          <Routes />
      </ScrollTop>
    </ThemeCustomization>
  </BrowserRouter>

);

export default App;
