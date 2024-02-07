import logo from './logo.svg';
import './css/App.css';
import Header from './components/Header';
import AttendanceInput from './components/AttendanceInput';
import AttendTotal from './components/AttendTotal';

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
