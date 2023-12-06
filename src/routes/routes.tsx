import urls from "./urls";
import { renderRoutes } from "./GenerateRoutes";
import AdminLayout from "@layouts/admin/AdminLayout";
import Dashboard from "@pages/admin/dashboard";
import Orders from "@pages/admin/orders";
import Calendar from "@pages/admin/calendar";
import BaseLayout from "@layouts/base";
import Home from "@pages/home";

const routes = [
   {
    layout: <AdminLayout />,
    routes: [
      {
        path: urls.dashboard,
        component: <Dashboard />,
        isPublic: false
      },
      {
        path: urls.orders,
        component: <Orders />,
        isPublic: false
      },
      {
        path: urls.calendar,
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
  }

]

export const Routes = renderRoutes(routes);