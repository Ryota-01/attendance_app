import logo from './logo.svg';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './css/App.css';
import './css/Common.css';
import Header from './components/Header';
import AttendanceInput from './components/AttendanceInput';
import AttendTotal from './components/AttendTotal';
import DigitalClock from './components/DigitalClock';
import AttendanceButton from './components/AttendanceButton';
import AttendanceList from './components/AttendanceList';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <DigitalClock />
        <AttendanceButton />
        <AttendanceList />
        <Routes>
          <Route path='/attendancelist' element={<AttendanceList />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
