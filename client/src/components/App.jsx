import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "../pages/Login";
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard";

const App = () => {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
            </Routes>
        </Router>
    );
};

export default App;