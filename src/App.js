import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Hotel from "./pages/Hotel";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import NewHotel from "./pages/NewHotel";
import Rooms from "./pages/Rooms";
import Transactions from "./pages/Transactions";
import NewRoom from "./pages/NewRoom";
import EditHotel from "./pages/EditHotel";
import EditRoom from "./pages/EditRoom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/*"
            element={
              <>
                <Header />
                <Navbar />
                <div className="content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/hotels" element={<Hotel />} />
                    <Route path="/create-hotel" element={<NewHotel />} />
                    <Route path="/edit-hotel/:hotelId" element={<EditHotel />} />
                    <Route path="/rooms" element={<Rooms />} />
                    <Route path="/create-room" element={<NewRoom />} />
                    <Route path="/edit-room/:roomId" element={<EditRoom />} />
                    <Route path="/transactions" element={<Transactions />} />
                  </Routes>
                </div>
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
