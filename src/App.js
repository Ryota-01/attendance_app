import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./css/App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { AuthProvider } from "./context/AuthContext";
import AttendanceListPage from "./pages/AttendanceListPage";
import LeaveRequestForm from "./pages/LeaveRequestForm";
import CreateUserInfo from "./pages/CreateUserInfo";
import { UserProvider } from "./context/useUserContext";
import { ApplicationDataProvider } from "./context/useApplicationDataContext";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ApplicationDataProvider>
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
                path="/attendance"
                element={<PrivateRoute index element={<Home />} />}
              />
              <Route
                path="/attendancelist"
                element={<PrivateRoute index element={<AttendanceListPage />} />}
              />
              <Route
                path="/leaverequest"
                element={<PrivateRoute index element={<LeaveRequestForm />} />}
              />
            </Routes>
          </div>
        </ApplicationDataProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
