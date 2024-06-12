import { BrowserRouter, Route ,Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import P404 from "./components/P404";
import Navbar from "./components/Navbar";
import Home from "./components/Home"
import AddPoll from "./components/AddPoll";
import Userpoll from "./components/Userpoll";
import AdminNavbar from "./components/AdminNavbar";
import AdminPanel from "./components/AdminPanel"
import Protected from "./utils/Protected.config";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Signup />} />
            <Route path="*" element={<P404 />} />
            <Route
              path="/home"
              element={
                <Protected>
                  <Navbar />
                  <Home />
                </Protected>
              }
            />
            <Route
              path="/addPoll"
              element={
                <Protected>
                  <Navbar />
                  <AddPoll />
                </Protected>
              }
            />
            <Route
              path="/userPoll"
              element={
                <Protected>
                  <Navbar />
                  <Userpoll />
                </Protected>
              }
            />
            <Route
              path="/admin-panel"
              element={
                <Protected>
                  <AdminNavbar />
                  <AdminPanel />
                </Protected>
              }
            />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
