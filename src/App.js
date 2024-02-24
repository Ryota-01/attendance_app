import logo from "./logo.svg";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./css/App.css";
import Home from "./pages/Home";
import Header from "./pages/Header";
import Login from "./pages/Login";
import AttendanceInput from "./components/AttendanceInput";
import AttendTotal from "./components/AttendTotal";
import DigitalClock from "./components/DigitalClock";
import AttendanceButton from "./components/AttendanceButton";
import AttendancePage from "./pages/AttendancePage";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App" style={{ margin: '2em' }}>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" Component={ SignUp } />
            <Route path="/" Component={ Home } />
            <Route path="/home" Component={ Home } />
            <Route path="/login" Component={ Login } />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
