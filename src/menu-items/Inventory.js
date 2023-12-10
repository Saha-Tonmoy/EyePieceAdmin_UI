// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const inventory = {
  id: 'inventory',
  title: 'Inventory',
  type: 'group',
  children: [
    {
      id: 'clinventory',
      title: 'Contact Lens Inventory',
      type: 'item',
      url: '/CLRepository',
      icon: icons.LoginOutlined,
    },
    {
      id: 'register1',
      title: 'Register',
      type: 'item',
      url: '/register',
      icon: icons.ProfileOutlined,
      target: true
    }
  ]
};

export default inventory;
