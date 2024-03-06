import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function PublicRoute({ component: Component, ...rest }) {
  //restにはPrivateRouteに設定されているPropsとpathとexactの値が入っている。
  //Componentには/signにアクセスすれば/Sign、/loginであればLoginコンポーネントになります。
  //RoutePropsにはroute propsであるmatch, location, historyが含まれている。
  const { user } = useAuthContext();
  const navigate = useNavigate();
  if(user) {
    navigate("/userinfo");
    return;
  }
  return (
    <div>
      <Routes>
        <Route
          {...rest}
        />
      </Routes>
    </div>
  );
}
