import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/user/home/Home";
import Signup from "./pages/user/signup/Signup";
import Login from "./pages/user/login/Login";
import AdminLogin from "./pages/admin/login/AdminLogin";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import List from "./pages/admin/list/List";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
