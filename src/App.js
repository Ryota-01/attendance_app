import logo from "./logo.svg";
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
import UserInfo from "./pages/CreateUserInfo";

function App() {
  return (
    <AuthProvider>
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
          <Route path="/" element={<PrivateRoute index element={<Home />} />} />
          <Route
            path="/home"
            element={<PrivateRoute index element={<Home />} />}
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
            path="/userinfo"
            element={<PrivateRoute index element={<UserUpdata />} />}
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
