import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Playlist from "./pages/Playlist";
import Content from "./pages/Content";
import LogIn from "./pages/LogIn";
import { Signup } from "./pages/SignUp";
import { AppProvider, useAppContext } from "./components/AppContext";

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/playlist/:id" element={<Playlist />} />

          {!isLoggedIn ? (
            <>
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<Signup />} />
            </>
          ) : null}
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
