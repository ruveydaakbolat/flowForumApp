import { Routes, Route } from "react-router-dom";
import Login from "./pages/MainPage/Login";
import Register from "./pages/Register";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./pages/MainPage/ProtectedRoute";
import Profile from "./pages/MainPage/Profile";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
