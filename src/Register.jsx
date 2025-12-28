import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from "./js/firebase.js"; 
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Buat akun di Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Simpan data user ke Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                role: "user", // Default role
                createdAt: new Date()
            });

            Swal.fire({
                icon: 'success',
                title: 'REGISTRATION COMPLETE',
                text: 'Welcome to the team, Recruit.',
                timer: 2000,
                showConfirmButton: false,
                background: '#020617',
                color: '#fbbf24', // Amber text
                iconColor: '#fbbf24'
            }).then(() => {
                navigate('/login'); 
            });

        } catch (error) {
            console.error("Register Error:", error);
            
            let pesan = error.message;
            if (error.code === 'auth/email-already-in-use') pesan = "Email ID already registered in database.";
            if (error.code === 'auth/weak-password') pesan = "Password security level too low (min 6 chars).";
            
            Swal.fire({
                icon: 'error',
                title: 'REGISTRATION FAILED',
                text: pesan,
                background: '#020617',
                color: '#ef4444',
                iconColor: '#ef4444'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        // --- BACKGROUND ---
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#020617] font-sans selection:bg-amber-500/30 selection:text-amber-200">
            
            {/* Ambient Glow Latar Belakang (Amber/Gold Theme) */}
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[150px] opacity-40 animate-pulse-slow"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[150px] opacity-40 animate-pulse-slow delay-700"></div>
            
            {/* Grid Pattern Hexagon */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] opacity-[0.03]"></div>

            {/* --- KARTU REGISTER (PANEL HOLOGRAM) --- */}
            <div className="relative z-10 w-full max-w-lg">
                
                {/* Efek Border Neon Menyala di Belakang */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-600 rounded-[2.5rem] blur opacity-30 animate-tilt"></div>

                <div className="relative bg-[#0b1121] border-2 border-amber-500/20 rounded-[2rem] p-8 md:p-10 shadow-[0_0_60px_rgba(245,158,11,0.15)] overflow-hidden">
                    
                    {/* Dekorasi Sudut Tekno */}
                    <div className="absolute top-0 right-0 w-24 h-24 border-t-[3px] border-r-[3px] border-amber-500/50 rounded-tr-[1.5rem]"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 border-b-[3px] border-l-[3px] border-amber-500/50 rounded-bl-[1.5rem]"></div>

                    {/* HEADER */}
                    <div className="text-center mb-8 relative">
                        <div className="inline-block p-4 rounded-2xl bg-gradient-to-b from-slate-800 to-black border border-amber-500/30 shadow-[0_0_25px_rgba(245,158,11,0.15)] mb-5">
                            <img src="/image/logosij.png" alt="SIJ" className="h-14 w-auto drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" onError={(e) => e.target.style.display='none'} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase drop-shadow-lg">
                            JOIN <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">INNOVATION</span>
                        </h2>
                        <p className="text-amber-500/80 text-sm font-bold tracking-[0.3em] mt-2 uppercase">New Personnel Registration</p>
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleRegister} className="space-y-6">
                        
                        {/* INPUT NAMA */}
                        <div className="space-y-2 group">
                            <label className="block text-xs font-bold text-amber-500 uppercase tracking-widest ml-1 group-hover:text-white transition-colors">
                                <i className="fas fa-id-badge mr-2"></i> Full Legal Name
                            </label>
                            <div className="relative">
                                <input 
                                    type="text" required 
                                    value={name} onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-[#020617] border-2 border-slate-700 text-white text-lg px-6 py-4 rounded-xl focus:outline-none focus:border-amber-500 focus:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-300 placeholder:text-slate-600 font-medium"
                                    placeholder="Yuda Pamungkas"
                                />
                            </div>
                        </div>

                        {/* INPUT EMAIL */}
                        <div className="space-y-2 group">
                            <label className="block text-xs font-bold text-amber-500 uppercase tracking-widest ml-1 group-hover:text-white transition-colors">
                                <i className="fas fa-envelope mr-2"></i> Email Contact
                            </label>
                            <div className="relative">
                                <input 
                                    type="email" required 
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#020617] border-2 border-slate-700 text-white text-lg px-6 py-4 rounded-xl focus:outline-none focus:border-amber-500 focus:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-300 placeholder:text-slate-600 font-medium"
                                    placeholder="email@example.com"
                                />
                            </div>
                        </div>

                        {/* INPUT PASSWORD */}
                        <div className="space-y-2 group">
                            <label className="block text-xs font-bold text-amber-500 uppercase tracking-widest ml-1 group-hover:text-white transition-colors">
                                <i className="fas fa-lock mr-2"></i> Secure Passcode
                            </label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    required 
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#020617] border-2 border-slate-700 text-white text-lg px-6 py-4 rounded-xl focus:outline-none focus:border-amber-500 focus:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-300 placeholder:text-slate-600 font-medium tracking-wider"
                                    placeholder="••••••••••••"
                                />
                                {/* TOMBOL MATA */}
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 hover:text-amber-500 transition-colors cursor-pointer z-10"
                                >
                                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xl`}></i>
                                </button>
                            </div>
                        </div>

                        {/* TOMBOL REGISTER */}
                        <button 
                            type="submit" disabled={loading}
                            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white py-5 rounded-xl font-black text-lg tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_5px_20px_-5px_rgba(245,158,11,0.5)] transform hover:-translate-y-1 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed border-t border-white/20 relative overflow-hidden group mt-6"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {loading ? (
                                    <><i className="fas fa-circle-notch fa-spin"></i> REGISTERING...</>
                                ) : (
                                    <>CONFIRM REGISTRATION <i className="fas fa-check-circle animate-bounce"></i></>
                                )}
                            </span>
                            {/* Efek Kilat */}
                            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 group-hover:animate-shine transition-all duration-1000"></div>
                        </button>
                    </form>

                    {/* FOOTER LINKS */}
                    <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-4 text-center">
                        <Link to="/login" className="group py-2 px-4 rounded-lg hover:bg-white/5 transition-all duration-300">
                            <span className="text-slate-400 text-sm font-medium group-hover:text-white transition-colors">Sudah memiliki akun? </span>
                            <span className="text-amber-500 text-sm font-bold uppercase tracking-wider border-b-2 border-transparent group-hover:border-amber-500 pb-1 transition-all ml-2 group-hover:shadow-[0_0_15px_orange] group-hover:text-amber-400">
                                LOGIN ACCESS
                            </span>
                        </Link>
                        
                        <Link to="/" className="inline-flex items-center justify-center gap-2 text-slate-500 hover:text-white text-xs font-bold tracking-[0.2em] uppercase transition-colors py-2">
                            <i className="fas fa-arrow-left text-sm"></i> Abort Registration
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}