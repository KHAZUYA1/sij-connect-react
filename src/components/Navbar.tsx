import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Efek untuk mendeteksi scroll (agar navbar berubah style saat discroll)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed w-full z-50 transition-all duration-300 border-b border-white/10 shadow-lg ${
        isScrolled ? 'bg-[#0f172a] py-2' : 'bg-[#0f172a] py-3'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* LOGO */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-lg shadow-lg hover:scale-105 transition duration-300 bg-white/5">
            <img
              src="/image/LOGO SIJ.png" // Pastikan gambar ada di folder public/image
              alt="Logo SIJ"
              className="h-10 w-auto object-contain"
            />
          </div>
          <div className="hidden md:flex flex-col text-white">
            <span className="text-xl font-bold tracking-wider drop-shadow-md">
              PT SINO INDAH JAYA
            </span>
            <span className="text-[10px] font-bold text-amber-400 tracking-[0.2em] uppercase">
              Korean Car Seat Cover Specialist
            </span>
          </div>
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-white uppercase tracking-wide">
          <a href="/" className="hover:text-amber-400 transition relative group">
            Beranda
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full"></span>
          </a>
          <a href="/profil" className="hover:text-amber-400 transition relative group">
            Profil
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full"></span>
          </a>
          <a href="/produk" className="hover:text-amber-400 transition relative group">
            Produk
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full"></span>
          </a>
          <a href="#bulletin" className="hover:text-amber-400 transition relative group">
            Berita
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full"></span>
          </a>
          <a href="/career" className="text-amber-400 hover:text-amber-300 transition relative group">
            Karir
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400"></span>
          </a>
        </div>

        {/* AUTH BUTTONS */}
        <div id="auth-buttons" className="hidden md:flex items-center gap-4">
          <a
            href="/login"
            className="bg-amber-500 hover:bg-amber-600 text-[#0f172a] px-6 py-2.5 rounded-full font-bold text-sm transition shadow-lg shadow-amber-500/20 transform hover:scale-105 flex items-center gap-2"
          >
            <i className="fas fa-user-circle"></i>
            LOGIN / DAFTAR
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          id="mobile-btn"
          className="md:hidden text-2xl text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* MOBILE MENU CONTENT */}
      <div
        id="mobile-menu"
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } bg-[#0f172a] border-t border-slate-700 shadow-xl`}
      >
        <a href="/" className="block py-3 px-6 text-white border-b border-slate-800 hover:bg-slate-800">
          Beranda
        </a>
        <a href="/profil" className="block py-3 px-6 text-white border-b border-slate-800 hover:bg-slate-800">
          Profil
        </a>
        <a href="/produk" className="block py-3 px-6 text-white border-b border-slate-800 hover:bg-slate-800">
          Produk
        </a>
        <a href="#bulletin" className="block py-3 px-6 text-white border-b border-slate-800 hover:bg-slate-800">
          Berita
        </a>
        <a href="/career" className="block py-3 px-6 text-amber-400 hover:bg-slate-800">
          Karir
        </a>
        <a href="/login" className="block py-3 px-6 text-white font-bold bg-amber-600 hover:bg-amber-700">
          Login / Daftar
        </a>
      </div>
    </nav>
  );
};

export default Navbar;