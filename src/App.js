import logo from './logo.svg';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './css/App.css';
import './css/Common.css';
import Home from './Pages/Home';
import Header from './Pages/Header';
import AttendanceInput from './Components/AttendanceInput';
import AttendTotal from './Components/AttendTotal';
import DigitalClock from './Components/DigitalClock';
import AttendanceButton from './Components/AttendanceButton';
import AttendancePage from './Pages/AttendancePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/attendancepage' element={<AttendancePage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
