import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewReview from "./pages/NewReview";
import EditReview from "./pages/EditReview";

function App() {
  return (
    <Router>
      {" "}
      {/* Make sure the Router is wrapping your whole app */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-review" element={<NewReview />} />
        <Route path="/edit-review/:id" element={<EditReview />} />
      </Routes>
    </Router>
  );
}

export default App;
