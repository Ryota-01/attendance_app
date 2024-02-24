import logo from './logo.svg';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './css/App.css';
import Home from './pages/Home';
import Header from './pages/Header';
import AttendanceInput from './components/AttendanceInput';
import AttendTotal from './components/AttendTotal';
import DigitalClock from './components/DigitalClock';
import AttendanceButton from './components/AttendanceButton';
import AttendancePage from './pages/AttendancePage';
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <SignUp />
        {/* <Header /> */}
        <Routes>
          {/* <Route path='/' element={<Home />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/attendancepage' element={<AttendancePage />}></Route> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
