import { Suspense, lazy, ReactNode } from "react";
import { useRoutes, RouteObject } from "react-router-dom";

// import Login from "../pages/Login";
// import ChatApp from "../pages/App";
// import CreateJson from "../pages/Json";

const Login = lazy(() => import("../pages/Login"));
const ChatApp = lazy(() => import("../pages/App"));
const CreateJson = lazy(() => import("../pages/Json"));

interface RouteItem {
  path: string;
  auth: boolean;
  element?: ReactNode;
  children?: RouteItem[];
  index?: string;
}

export const routers: RouteItem[] = [
  {
    auth: false,
    path: "/login",
    element: <Login />,
  },
  {
    auth: true,
    path: "/",
    children: [
      {
        path: "/chat",
        auth: true,
        element: <ChatApp />,
      },
      {
        path: "/json",
        auth: true,
        element: <CreateJson />,
      },
    ],
  },
];

export function getRoutes(routes: RouteItem[]) {
  const router = useRoutes(routes as any);
  return router;
}
