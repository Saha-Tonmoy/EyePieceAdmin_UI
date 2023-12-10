// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const Customer = {
  id: 'customer',
  title: 'Customer',
  type: 'group',
  children: [
    {
      id: 'customerorder',
      title: 'Customer Order',
      type: 'item',
      url: '/Customerorder',
      icon: icons.LoginOutlined,
    },
    {
      id: 'DueOrders',
      title: 'Due Orders',
      type: 'item',
      url: '/CustomerDueOrders',
      icon: icons.ProfileOutlined,
    }
  ]
};

export default Customer;
