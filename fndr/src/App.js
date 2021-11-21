import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Watchlist } from './components/Watchlist';
import { Watched } from './components/Watched';
import { Add } from './components/Add';
import { GlobalContext, GlobalProvider } from './context/GlobalState';
import './App.css';
import "./lib/font-awesome/css/all.min.css";

function App() {
  return (
    <GlobalProvider>
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Watchlist/>}/>
        <Route path="/watched" element={<Watched/>}/>
        <Route path="/add" element={<Add/>}/>
      </Routes>
      <Footer/>
    </Router>
    </GlobalProvider>
  );
}

export default App;
