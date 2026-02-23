import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventList from './pages/EventList';
import EventDetails from './pages/EventDetails';
import RegistrationPage from './pages/RegistrationPage';
import SuccessPage from './pages/SuccessPage';
import DigitalPass from './pages/DigitalPass';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/register/:id" element={<RegistrationPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/digital-pass/:id" element={<DigitalPass />} />
      </Routes>
    </Router>
  );
}

export default App;
