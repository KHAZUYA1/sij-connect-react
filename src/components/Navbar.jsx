import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, onAuthStateChanged, signOut } from '../js/firebase.js'; // Pastikan path firebase benar
import Swal from 'sweetalert2';

export default function Navbar() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    
    // Email Admin (Harus sama persis dengan yang di Login.jsx)
    const ADMIN_EMAIL = "sij.connect01@gmail.com"; 

    // --- EFFECT: Cek Login Realtime ---
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // --- LOGIC: Logout ---
    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Keluar Akun?',
            text: "Anda akan diarahkan ke halaman utama.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Keluar',
            cancelButtonText: 'Batal',
            background: '#020617', color: '#fff'
        });

        if (result.isConfirmed) {
            await signOut(auth);
            Swal.fire({
                title: 'Berhasil Keluar',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                background: '#020617', color: '#fff'
            });
            navigate('/'); // Redirect ke Home setelah logout
            setUser(null);
        }
    };

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 bg-[#0f172a] border-b border-white/10 shadow-lg">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                
                {/* --- LOGO --- */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="p-2 rounded-lg shadow-lg hover:scale-105 transition duration-300 bg-white/5">
                        <img src="/image/logosij.png" alt="Logo SIJ" className="h-10 w-auto object-contain" onError={(e) => e.target.style.display='none'} />
                    </div>
                    <div className="hidden md:flex flex-col text-white">
                        <span className="text-xl font-bold tracking-wider drop-shadow-md">PT SINO INDAH JAYA</span>
                        <span className="text-[10px] font-bold text-amber-400 tracking-[0.2em] uppercase">Korean Car Seat Specialist</span>
                    </div>
                </Link>

                {/* --- DESKTOP MENU --- */}
                <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-white uppercase tracking-wide">
                    <Link to="/" className="hover:text-amber-400 transition relative group">Beranda</Link>
                    <Link to="/profil" className="hover:text-amber-400 transition relative group">Profil</Link>
                    <Link to="/produk" className="hover:text-amber-400 transition relative group">Produk</Link>
                    <Link to="/berita" className="hover:text-amber-400 transition relative group">Berita</Link> {/* Link Berita Baru */}
                    <Link to="/karir" className="hover:text-amber-400 transition relative group">Karir</Link>
                </div>

                {/* --- AUTH BUTTONS (LOGIC DASHBOARD / LOGOUT) --- */}
                <div className="hidden md:flex items-center gap-4">
                    {loading ? (
                        <span className="text-gray-400 text-xs">...</span>
                    ) : user ? (
                        user.email === ADMIN_EMAIL ? (
                            // JIKA ADMIN -> Tombol Dashboard Hijau
                            <Link to="/admin" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-full font-bold text-sm transition shadow-lg flex items-center gap-2">
                                <i className="fas fa-columns"></i> DASHBOARD
                            </Link>
                        ) : (
                            // JIKA USER BIASA -> Tombol Logout Merah
                            <div className="flex items-center gap-3">
                                {/* Info User Kecil (Opsional) */}
                                <span className="text-[10px] text-gray-400 border border-gray-700 px-2 py-1 rounded hidden lg:block">
                                    {user.email.split('@')[0]}
                                </span>
                                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-bold text-sm transition shadow-lg flex items-center gap-2 border border-red-500 hover:border-white">
                                    <i className="fas fa-sign-out-alt"></i> KELUAR
                                </button>
                            </div>
                        )
                    ) : (
                        // JIKA BELUM LOGIN -> Tombol Login Kuning
                        <Link to="/login" className="bg-amber-500 hover:bg-amber-600 text-[#0f172a] px-6 py-2.5 rounded-full font-bold text-sm transition shadow-lg shadow-amber-500/20 transform hover:scale-105 flex items-center gap-2">
                            <i className="fas fa-user-circle"></i> LOGIN / DAFTAR
                        </Link>
                    )}
                </div>

                {/* --- MOBILE MENU TOGGLE --- */}
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-2xl text-white focus:outline-none">
                    <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </div>

            {/* --- MOBILE MENU DROPDOWN --- */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-[#0f172a] border-t border-slate-700 shadow-xl">
                    <Link to="/" className="block py-3 px-6 text-white border-b border-slate-800 hover:bg-slate-800">Beranda</Link>
                    <Link to="/profil" className="block py-3 px-6 text-white border-b border-slate-800 hover:bg-slate-800">Profil</Link>
                    <Link to="/produk" className="block py-3 px-6 text-white border-b border-slate-800 hover:bg-slate-800">Produk</Link>
                    <Link to="/berita" className="block py-3 px-6 text-white border-b border-slate-800 hover:bg-slate-800">Berita</Link>
                    <Link to="/karir" className="block py-3 px-6 text-white border-b border-slate-800 hover:bg-slate-800">Karir</Link>
                    
                    <div className="p-4 border-t border-slate-800">
                        {user ? (
                            user.email === ADMIN_EMAIL ? (
                                <Link to="/admin" className="block w-full text-center py-3 bg-green-600 text-white font-bold rounded hover:bg-green-700">Dashboard Admin</Link>
                            ) : (
                                <div>
                                    <div className="text-center text-xs text-gray-400 mb-2">Login: {user.email}</div>
                                    <button onClick={handleLogout} className="block w-full text-center py-3 bg-red-600 text-white font-bold rounded hover:bg-red-700">LOGOUT</button>
                                </div>
                            )
                        ) : (
                            <Link to="/login" className="block w-full text-center py-3 bg-amber-600 text-white font-bold rounded hover:bg-amber-700">Login / Daftar</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
