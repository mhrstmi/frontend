import urls from "./urls";
import { Dashboard, Orders, Calendar, Employees, Customers, Editor } from '../pages';
import { ReactNode } from "react";

export type pathType = {
  path: string,
  element: ReactNode
}

const paths = [
      {
        path: urls.dashboard,
        element: <Dashboard />,
      },
      {
        path: urls.employees,
        element: <Employees />,
      },
      {
        path: urls.orders,
        element: <Orders />,
      },
      {
        path: urls.customers,
        element: <Customers />,
      },
      {
        path: urls.editor,
        element: <Editor />,
      },
      {
        path: urls.calendar,
        element: <Calendar />,
      }
]

export default paths;