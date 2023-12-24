import urls from "./urls";
import { renderRoutes } from "./GenerateRoutes";
import AdminLayout from "@layouts/admin/AdminLayout";
import Dashboard from "@pages/admin/dashboard";
import BaseLayout from "@layouts/base";
import Home from "@pages/base/home";
import Login from "@pages/account/login";
import AuthLayout from "@layouts/auth";
import UploadKnowledge from "../pages/admin/knowledge/uploadKnowledge";
import UploadResearch from "../pages/admin/research/uploadResearch";
import UploadLibrary from "../pages/admin/library/uploadLibrary";
import EditLibrary from "../pages/admin/library/editLibrary";
import EditResearch from "../pages/admin/research/editResearch";
import EditKnowledge from "../pages/admin/knowledge/editKnowledge";
import AdminKnowledge from "../pages/admin/knowledge";
import AdminResearch from "../pages/admin/research";
import AdminLibrary from "../pages/admin/library";
import Knowledge from "../pages/base/knowledge/Knowledge";
import Library from "../pages/base/library/Library";
import Research from "../pages/base/research/Research";
import AdminCalendar from "../pages/admin/calendar/AdminCalendar";

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
        component: <AdminKnowledge />,
        isPublic: false,
      },
      {
        path: urls.adminUploadKnowledge,
        component: <UploadKnowledge />,
        isPublic: false,
      },
      {
        path: urls.adminEditKnowledge,
        component: <EditKnowledge />,
        isPublic: false,
      },
      {
        path: urls.adminResearch,
        component: <AdminResearch />,
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
        component: <AdminLibrary />,
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
        component: <AdminCalendar />,
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
        path: urls.knowledge,
        component: <Knowledge />,
        isPublic: true
      }
    ]
  },
  {
    layout: <BaseLayout />,
    routes: [
      {
        path: urls.library,
        component: <Library />,
        isPublic: true
      }
    ]
  },
  {
    layout: <BaseLayout />,
    routes: [
      {
        path: urls.research,
        component: <Research />,
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