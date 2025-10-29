import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/dashboard/Dashboard';
import CreateEvent from './pages/create-event/CreateEvent';
import Raffles from './pages/raffles/Raffles';
import UploadParticipants from './pages/upload-participants/UploadParticipants';
import Settings from './pages/settings/Settings';
import { EventProvider } from './context/EventContext';
import { AppInitializer } from './app/AppInitializer';
import Registration from './pages/registration/Registration';

function App() {
  return (
    <EventProvider>
      <AppInitializer />
      <div className="App">
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-event" element={<CreateEvent />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/raffles" element={<Raffles />} />
              <Route path="/participants" element={<UploadParticipants />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </MainLayout>
        </Router>
      </div>
    </EventProvider>
  );
}

export default App;
