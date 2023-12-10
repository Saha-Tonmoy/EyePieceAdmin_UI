// project import
import pages from './pages';
import dashboard from './dashboard';
import utilities from './utilities';
import support from './support';
import inventory from './Inventory';
import Customer from './CustomerManagement';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard,Customer,inventory, pages, utilities, support]
};

export default menuItems;
