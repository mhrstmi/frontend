import urls from "./urls";
import { renderRoutes } from "./GenerateRoutes";
import AdminLayout from "@layouts/admin/AdminLayout";
import Dashboard from "@pages/admin/dashboard";
import Orders from "@pages/admin/orders";
import Calendar from "@pages/admin/calendar";
import BaseLayout from "@layouts/base";
import Home from "@pages/home";
import Login from "@pages/account/login";

const routes = [
   {
    layout: <AdminLayout />,
    routes: [
      {
        path: urls.adminHome,
        component: <Dashboard />,
        isPublic: false
      },
      {
        path: urls.adminDashboard,
        component: <Dashboard />,
        isPublic: false
      },
      {
        path: urls.orders,
        component: <Orders />,
        isPublic: false
      },
      {
        path: urls.adminCalendar,
        component: <Calendar />,
        isPublic: false
      }
    ]
  },
  {
    layout: <BaseLayout />,
    routes: [
      {
        path: urls.home,
        component: <Home />,
        isPublic: true
      }
    ]
  },
  {
    layout: <BaseLayout />,
    routes: [
      {
        path: urls.login,
        component: <Login />,
        isPublic: true
      }
    ]
  }

]

export const Routes = renderRoutes(routes);