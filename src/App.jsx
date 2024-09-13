import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Layouts/Home/home";
import VietTinBank from "./Pages/VietTinBank/viettinbank";

function App() {
  return (
    <div>
      <Home />

      <Routes>
        <Route path="/vietinbank" element={<VietTinBank />} />
      </Routes>
    </div>
  );
}

export default App;
