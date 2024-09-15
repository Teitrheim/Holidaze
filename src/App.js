import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Accommodation from "./pages/Accommodation";
import VenuePage from "./pages/VenuePage";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CreateVenue from "./pages/CreateVenue";
import ProtectedRoute from "./components/ProtectedRoute";
import VenueBookings from "./pages/VenueBookings";
import MyBookings from "./pages/MyBookings";
import EditVenue from "./pages/EditVenue";
import ProfileEdit from "./pages/ProfileEdit";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/venue/:id" element={<VenuePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-venue" element={<CreateVenue />} />
          <Route
            path="/profile-edit"
            element={
              <ProtectedRoute>
                <ProfileEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-venue/:id"
            element={
              <ProtectedRoute isVenueManager={true}>
                <EditVenue />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/venue-bookings"
            element={
              <ProtectedRoute isVenueManager={true}>
                <VenueBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-venue"
            element={
              <ProtectedRoute isVenueManager={true}>
                <CreateVenue />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
