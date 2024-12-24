import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Header.jsx';
import JellyBeanList from './JellyBeanList.jsx';
import JellyBeanDetails from './JellyBeanDetails.jsx';

const App = () => {
  const BASE_URL = 'https://jellybellywikiapi.onrender.com';

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<JellyBeanList baseUrl={BASE_URL} />} />
        <Route path="/bean/:id" element={<JellyBeanDetails baseUrl={BASE_URL} />} />

        {/* Catch-all route for 404 handling */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
};

export default App;