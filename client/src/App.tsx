import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.tsx';
import Survey from './components/Survey.tsx';
import SurveyComplete from './components/SurveyComplete.tsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/question/:questionIndex" element={<Survey />} />
          <Route path="/complete" element={<SurveyComplete />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
