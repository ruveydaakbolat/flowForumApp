import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainPage from "./pages/MainPage/index";
import ProtectedRoute from "./pages/ProtectedRoute";
import Profile from "./pages/Profile";
import Layout from "./pages/Layout";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />} >
          <Route path="" element={<MainPage />} />
          <Route path="/post/:id" element={<DetailPage />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
