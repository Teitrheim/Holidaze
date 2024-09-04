import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import SignupSection from "./components/SignupSection";
import Footer from "./components/Footer";
import Accommodation from "./pages/Accommodation";
import VenuePage from "./pages/VenuePage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

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
        </Routes>
        <SignupSection />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
