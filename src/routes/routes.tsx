import urls from "./urls";
import { renderRoutes } from "./GenerateRoutes";
import AdminLayout from "@layouts/admin/AdminLayout";
import Dashboard from "@pages/admin/dashboard";
import BaseLayout from "@layouts/base";
import Home from "@pages/home";
import Login from "@pages/account/login";
import AuthLayout from "@layouts/auth";
import Knowledge from "@pages/admin/knowledge";
import Research from "@pages/admin/research";
import Library from "@pages/admin/library";
import UploadKnowledge from "../pages/admin/knowledge/uploadKnowledge";
import UploadResearch from "../pages/admin/research/uploadResearch";
import UploadLibrary from "../pages/admin/library/uploadLibrary";
import EditLibrary from "../pages/admin/library/editLibrary";
import EditResearch from "../pages/admin/research/editResearch";
import EditKnowledge from "../pages/admin/knowledge/editKnowledge";

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
        path: urls.adminKnowledge,
        component: <Knowledge />,
        isPublic: false,
      },
      {
        path: urls.adminUploadKnowledge,
        component: <UploadKnowledge />,
        isPublic: false,
      },
      {
        path: urls.adminKnowledge,
        component: <EditKnowledge />,
        isPublic: false,
      },
      {
        path: urls.adminResearch,
        component: <Research />,
        isPublic: false,
      },
      {
        path: urls.adminUploadResearch,
        component: <UploadResearch />,
        isPublic: false
      },
      {
        path: urls.adminEditResearch,
        component: <EditResearch />,
        isPublic: false
      },
      {
        path: urls.adminLibrary,
        component: <Library />,
        isPublic: false
      },
      {
        path: urls.adminUploadLibrary,
        component: <UploadLibrary />,
        isPublic: false
      },
      {
        path: urls.adminEditLibrary,
        component: <EditLibrary />,
        isPublic: false
      },
      {
        path: urls.adminCalendar,
        component: <Library />,
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
    layout: <AuthLayout />,
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