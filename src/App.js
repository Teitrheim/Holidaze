import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Accommodation from "./pages/Accommodation";
import VenuePage from "./pages/VenuePage";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import CreateVenue from "./pages/CreateVenue";
import ProtectedRoute from "./components/ProtectedRoute";
import VenueBookings from "./pages/VenueBookings";
import MyBookings from "./pages/MyBookings";
import EditVenue from "./pages/EditVenue";
import ProfileEdit from "./pages/ProfileEdit";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/accommodation" element={<Accommodation />} />
            <Route path="/venue/:id" element={<VenuePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile-edit"
              element={
                <ProtectedRoute>
                  <ProfileEdit />
                </ProtectedRoute>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/create-venue"
              element={
                <ProtectedRoute isVenueManager={true}>
                  <CreateVenue />
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
          </Routes>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
