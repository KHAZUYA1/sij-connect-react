import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Semua Halaman
import Admin from './Admin';
import Login from './Login';
import Register from './Register';
import Home from './Home'; 
import Karir from './Karir';
import Produk from './Produk';
import Profil from './Profil';
import DetailNews from './DetailNews';
import Berita from './Berita'; // <--- 1. TAMBAHKAN INI

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Route Halaman Publik */}
        <Route path="/karir" element={<Karir />} />
        <Route path="/produk" element={<Produk />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/berita" element={<Berita />} /> {/* <--- 2. TAMBAHKAN INI */}
        
        <Route path="/news/:id" element={<DetailNews />} />
        
        {/* Route Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Route Admin */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;