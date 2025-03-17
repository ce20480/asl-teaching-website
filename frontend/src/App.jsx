import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import your pages here
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import Practice from "./pages/Practice";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<Home />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/" element={<h1>Welcome to ASL Teaching!</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
