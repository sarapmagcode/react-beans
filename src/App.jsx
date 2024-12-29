import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Header from './Header/Header.jsx';
import JellyBeanList from './JellyBeanList.jsx';
import JellyBeanDetails from './JellyBeanDetails.jsx';
import RecipeList from './RecipeList.jsx';
import RecipeDetails from './RecipeDetails.jsx';

const App = () => {
  const BASE_URL = 'https://jellybellywikiapi.onrender.com/api';

  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<JellyBeanList baseUrl={BASE_URL} />} />
        <Route
          path="/beans/:id"
          element={<JellyBeanDetails baseUrl={BASE_URL} />}
        />
        <Route
          path="/recipes"
          element={<RecipeList baseUrl={BASE_URL} />}
        />
        <Route
          path="/recipes/:id"
          element={<RecipeDetails baseUrl={BASE_URL} />}
        />

        {/* Catch-all route for 404 handling */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
