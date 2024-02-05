import logo from './logo.svg';
import './App.css';
import Header from './common/Header';
import AttendanceInput from './common/AttendanceInput';
import AttendTotal from './common/AttendTotal';

function App() {
  return (
    <div className="App">
      <Header />
      <AttendanceInput />
      <AttendTotal />
    </div>
  );
}

export default App;
