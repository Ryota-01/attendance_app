import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./css/App.css";
import "./css/Common.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { AuthProvider } from "./context/AuthContext";
import AttendanceList from "./pages/AttendanceList";
import LeaveRequestForm from "./pages/LeaveRequestForm";
import UserUpdata from "./pages/UserUpdata";
import CreateUserInfo from "./pages/CreateUserInfo";
import UserInfo from "./pages/UserInfo";
import ApplicationList from "./pages/ApplicationList";
import ConfirmUserCreateInfo from "./pages/ConfirmUserCreateInfo";
import { UserProvider } from "./context/useUserContext";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <div className="App">
          <Routes>
            <Route
              path="/signup"
              element={<PublicRoute index element={<SignUp />} />}
            />
            <Route
              path="/login"
              element={<PublicRoute index element={<Login />} />}
            />
            <Route
              path="/"
              element={<PrivateRoute index element={<Home />} />}
            />
            <Route
              path="/home"
              element={<PrivateRoute index element={<Home />} />}
            />
            <Route
              path="/createuserinfo"
              element={<PrivateRoute index element={<CreateUserInfo />} />}
            />
            <Route
              path="/confirmusercreateinfo"
              element={
                <PrivateRoute index element={<ConfirmUserCreateInfo />} />
              }
            />
            <Route
              path="/userinfo"
              element={<PrivateRoute index element={<UserInfo />} />}
            />
            <Route
              path="/attendance"
              element={<PrivateRoute index element={<Home />} />}
            />
            <Route
              path="/attendancelist"
              element={<PrivateRoute index element={<AttendanceList />} />}
            />
            <Route
              path="/leaverequest"
              element={<PrivateRoute index element={<LeaveRequestForm />} />}
            />
            <Route
              path="/applicationList"
              element={<PrivateRoute index element={<ApplicationList />} />}
            />
            <Route
              path="/userinfo"
              element={<PrivateRoute index element={<UserUpdata />} />}
            />
          </Routes>
        </div>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
