import logo from './logo.svg';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './css/App.css';
import './css/Common.css';
import Home from './components/Home';
import Header from './components/Header';
import AttendanceInput from './components/AttendanceInput';
import AttendTotal from './components/AttendTotal';
import DigitalClock from './components/DigitalClock';
import AttendanceButton from './components/AttendanceButton';
import AttendancePage from './components/AttendancePage';

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
