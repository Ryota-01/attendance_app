import logo from './logo.svg';
import './css/App.css';
import './css/Common.css';
import Header from './components/Header';
import AttendanceInput from './components/AttendanceInput';
import AttendTotal from './components/AttendTotal';
import DigitalClock from './components/DigitalClock';
import AttendanceButton from './components/AttendanceButton';

function App() {
  return (
    <div className="App">
      <Header />
      <DigitalClock />
      <AttendanceButton />
    </div>
  );
}

export default App;
