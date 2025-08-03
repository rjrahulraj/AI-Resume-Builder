import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import About from "./pages/About/index.jsx";
import { useUserContext } from "./context/UserContextProvider.jsx";
import AuthPage from "./pages/AuthPage/index.jsx";
import Header from "./components/Header.jsx";
import FullScreenSpinner from "./components/FullScreenSpinner.jsx";
import Footer from "./components/Footer.jsx";
import Dashboard from './pages/Dashboard/index.jsx';
import EditResume from './pages/EditResume/EditResume.jsx';


function App() {
  const { loading } = useUserContext();
  return (
    <div className="bg-sky-50">
      {loading && <FullScreenSpinner />}
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/resume/:resumeId" element={<EditResume />} />
      </Routes>
      <Footer></Footer>
    </div>

  );
}

export default App;
