import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import "./css/App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AttendanceInput from "./components/AttendanceInput";
import AttendTotal from "./components/AttendTotal";
import DigitalClock from "./components/DigitalClock";
import AttendanceButton from "./components/AttendanceButton";
import AttendancePage from "./pages/AttendancePage";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";

function App() {
  return (
    <AuthProvider>
      <div className="App" style={{ margin: "2em" }}>
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
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
