import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Reel } from "./components/Reel";
import { Watchlist } from "./components/Watchlist";
import { Watched } from "./components/Watched";
import { Add } from "./components/Add";
import { GlobalContext, GlobalProvider } from "./context/GlobalState";
import "./App.css";
import "./lib/font-awesome/css/all.min.css";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <div className="main__wrapper">
          <Header />
          <div className="main__container">
            <Routes>
              <Route path="/reel" element={<Reel />} />
              <Route exact path="/" element={<Watchlist />} />
              <Route path="/watched" element={<Watched />} />
              <Route path="/add" element={<Add />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
