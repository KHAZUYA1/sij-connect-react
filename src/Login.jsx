import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './js/firebase.js';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // --- EMAIL KHUSUS ADMIN (HARDCODED SECURITY) ---
    const ADMIN_EMAIL = "sij-connect01@gmail.com";

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // --- LOGIKA PEMISAH (SATU PINTU UNTUK DUA ARAH) ---
            if (user.email === ADMIN_EMAIL) {
                // JIKA ADMIN: Masuk ke Dashboard
                Swal.fire({
                    icon: 'success',
                    title: 'ACCESS GRANTED',
                    text: 'Welcome back, Administrator.',
                    timer: 1500,
                    showConfirmButton: false,
                    background: '#020617', color: '#22d3ee', iconColor: '#22d3ee'
                });
                navigate('/admin');
            } else {
                // JIKA USER BIASA: Masuk ke Halaman Utama (Home)
                Swal.fire({
                    icon: 'success',
                    title: 'LOGIN SUCCESS',
                    text: 'Selamat datang kembali.',
                    timer: 1500,
                    showConfirmButton: false,
                    background: '#020617', color: '#fff', iconColor: '#fff'
                });
                navigate('/'); // Redirect ke Home untuk User
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'ACCESS DENIED',
                text: 'Email atau Password salah.',
                background: '#020617', color: '#ef4444', iconColor: '#ef4444'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#030712] font-sans selection:bg-cyan-500 selection:text-black">
            {/* Background Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[150px] opacity-40 animate-pulse-slow"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[150px] opacity-40 animate-pulse-slow delay-1000"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-lg">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-40 animate-tilt"></div>
                <div className="relative bg-[#0b1121] border-2 border-cyan-500/20 rounded-[2rem] p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
                    
                    <div className="absolute top-0 left-0 w-24 h-24 border-t-[3px] border-l-[3px] border-cyan-500/50 rounded-tl-[1.5rem]"></div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 border-b-[3px] border-r-[3px] border-cyan-500/50 rounded-br-[1.5rem]"></div>

                    <div className="text-center mb-10 relative">
                        <div className="inline-block p-4 rounded-2xl bg-gradient-to-b from-slate-800 to-black border border-cyan-500/30 shadow-[0_0_25px_rgba(34,211,238,0.15)] mb-5">
                            <img src="/image/LOGO SIJ.png" alt="SIJ" className="h-14 w-auto drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" onError={(e) => e.target.style.display='none'} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase drop-shadow-lg">
                            SYSTEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">LOGIN</span>
                        </h2>
                        <p className="text-cyan-400/80 text-sm font-bold tracking-[0.3em] mt-2 uppercase">Secure Access Terminal</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-8">
                        <div className="space-y-2 group">
                            <label className="block text-xs font-bold text-cyan-300 uppercase tracking-widest ml-1 group-hover:text-white transition-colors">
                                <i className="fas fa-id-card mr-2"></i> User Identification
                            </label>
                            <div className="relative">
                                <input 
                                    type="email" required 
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#020617] border-2 border-slate-700 text-white text-lg px-6 py-4 rounded-xl focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300 placeholder:text-slate-600 font-medium"
                                    placeholder="Enter your email..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <label className="block text-xs font-bold text-cyan-300 uppercase tracking-widest ml-1 group-hover:text-white transition-colors">
                                <i className="fas fa-shield-alt mr-2"></i> Security Passcode
                            </label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} required 
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#020617] border-2 border-slate-700 text-white text-lg px-6 py-4 rounded-xl focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300 placeholder:text-slate-600 font-medium tracking-wider"
                                    placeholder="••••••••••••"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer z-10">
                                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xl`}></i>
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white py-5 rounded-xl font-black text-lg tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_5px_20px_-5px_rgba(6,182,212,0.5)] transform hover:-translate-y-1 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed border-t border-white/20 relative overflow-hidden group">
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {loading ? <><i className="fas fa-circle-notch fa-spin"></i> PROCESSING...</> : <>INITIALIZE SYSTEM <i className="fas fa-arrow-right animate-pulse"></i></>}
                            </span>
                            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 group-hover:animate-shine transition-all duration-1000"></div>
                        </button>
                    </form>

                    <div className="mt-10 pt-6 border-t border-white/10 flex flex-col gap-4 text-center">
                        <Link to="/register" className="group py-2 px-4 rounded-lg hover:bg-white/5 transition-all duration-300">
                            <span className="text-slate-400 text-sm font-medium group-hover:text-white transition-colors">Belum punya akses? </span>
                            <span className="text-cyan-400 text-sm font-bold uppercase tracking-wider border-b-2 border-transparent group-hover:border-cyan-400 pb-1 transition-all ml-2 group-hover:shadow-[0_0_15px_cyan] group-hover:text-cyan-300">REGISTER NEW ACCOUNT</span>
                        </Link>
                        <Link to="/" className="inline-flex items-center justify-center gap-2 text-slate-500 hover:text-white text-xs font-bold tracking-[0.2em] uppercase transition-colors py-2">
                            <i className="fas fa-power-off text-sm"></i> Terminate Session (Back)
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}