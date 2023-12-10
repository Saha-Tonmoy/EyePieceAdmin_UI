import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout'

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('../pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('../pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('../pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('../pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('../pages/components-overview/AntIcons')));
import ProtectedRoute from '../utils/ProtectedRoute ';

//render - ContactLens
const ContactLensRepository = Loadable(lazy(() => import('../pages/ContactLens/ContactLensRepository')));

//render - Customer
const CustomerOrder = Loadable(lazy(() => import('../pages/Cutomer-Management/CustomerOrder')));
const DueOrders = Loadable(lazy(() => import('../pages/Cutomer-Management/DueOrders')));
// import CustomerOrder from 'pages/Cutomer-Management/CustomerOrder';

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      )
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'CustomerOrder',
      element: (
        <ProtectedRoute>
          <CustomerOrder />
        </ProtectedRoute>
      )
    },
    {
      path: 'CustomerDueOrders',
      element: (
        <ProtectedRoute>
          <DueOrders />
        </ProtectedRoute>
      )
    },
    {
      path: 'CLRepository',
      element: (
        <ProtectedRoute>
          <ContactLensRepository />
        </ProtectedRoute>
      )
    },
    
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    }
  ]
};

export default MainRoutes;
