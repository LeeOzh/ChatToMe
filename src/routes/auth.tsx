import { useEffect } from "react";
import { routers } from "./routes";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";

const AuthRoute = ({ children, auth }: any) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";
};
