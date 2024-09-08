import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ApplicationDataProvider } from "./context/useApplicationDataContext";
import { UserProvider } from "./context/useUserContext";
import AttendanceListPage from "./pages/attendancelist/AttendanceListPage";
import CreateUserInfo from "./pages/createuserinfo/CreateUserInfo";
import LeaveRequestForm from "./pages/leaverequest/LeaveRequestPage";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import PDFDownloadPage from "./pages/pdf/PDFDownloadPage";
import PublicRoute from "./lib/PublicRoute";
import PrivateRoute from "./lib/PrivateRoute";
import SignUp from "./pages/signup/Signup";
import CreateInfomation from "./pages/createInfomation/CreateInfomation";

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
                path="/attendance"
                element={<PrivateRoute index element={<Home />} />}
              />
              <Route
                path="/attendancelist"
                element={
                  <PrivateRoute index element={<AttendanceListPage />} />
                }
              />
              <Route
                path="/attendancelist/download"
                element={<PrivateRoute index element={<PDFDownloadPage />} />}
              />
              <Route
                path="/leaverequest"
                element={<PrivateRoute index element={<LeaveRequestForm />} />}
              />
              <Route
                path="/createuserinfo"
                element={<PrivateRoute index element={<CreateUserInfo />} />}
              />
              <Route
                path="/createinformation"
                element={<PrivateRoute index element={<CreateInfomation />} />}
              />
            </Routes>
          </div>
        </ApplicationDataProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
