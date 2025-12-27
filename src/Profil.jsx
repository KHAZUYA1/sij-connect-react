import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// 1. IMPORT NAVBAR BARU
import Navbar from './components/Navbar.jsx';

export default function Profil() {
    
    // --- EFFECT ---
    useEffect(() => {
        // Init Animasi
        AOS.init({ duration: 800, once: true });
    }, []);

    return (
        <div className="overflow-x-hidden bg-slate-50 font-sans">
            
            {/* 2. PASANG NAVBAR DISINI (Otomatis ada tombol Logout/Dashboard) */}
            <Navbar />

            {/* --- HERO SECTION (TIDAK BERUBAH) --- */}
            <section className="relative pt-32 pb-20 bg-[#0f172a] text-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4" data-aos="fade-down">Tentang Kami</h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                        Dedikasi tinggi dalam menciptakan komponen interior otomotif terbaik dengan standar manufaktur Korea.
                    </p>
                </div>
            </section>

            {/* --- MAIN CONTENT (TIDAK BERUBAH) --- */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        
                        {/* Image Section */}
                        <div className="lg:w-1/2" data-aos="fade-right">
                            <img src="/image/GEDUNGSIJ.jpg" className="rounded-2xl shadow-2xl w-full object-cover h-96" alt="Gedung Pabrik" onError={(e) => e.target.src='https://placehold.co/600x400?text=Gedung+Pabrik'} />
                        </div>
                        
                        {/* Text Section */}
                        <div className="lg:w-1/2" data-aos="fade-left">
                            <h4 className="text-blue-600 font-bold uppercase tracking-widest mb-2">Sejarah & Filosofi</h4>
                            <h2 className="text-3xl font-extrabold text-[#0f172a] mb-6">Membangun Kualitas Sejak Hari Pertama</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                PT SINO INDAH JAYA didirikan dengan visi untuk membawa teknologi manufaktur Korea yang presisi ke jantung industri otomotif Indonesia di Majalengka. Kami percaya bahwa kenyamanan berkendara dimulai dari detail interior yang sempurna.
                            </p>
                            
                            <div className="grid grid-cols-1 gap-4">
                                <div className="p-4 bg-slate-50 border-l-4 border-amber-500 rounded shadow-sm">
                                    <h3 className="font-bold text-[#0f172a] text-lg">Visi</h3>
                                    <p className="text-gray-600 text-sm">Menjadi pemimpin pasar global dalam industri interior otomotif yang inovatif dan terpercaya.</p>
                                </div>
                                <div className="p-4 bg-slate-50 border-l-4 border-blue-600 rounded shadow-sm">
                                    <h3 className="font-bold text-[#0f172a] text-lg">Misi</h3>
                                    <p className="text-gray-600 text-sm">Mengutamakan kualitas (Quality), Biaya (Cost), Pengiriman (Delivery), dan Keselamatan (Safety) dalam setiap proses produksi.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- FOOTER (TIDAK BERUBAH) --- */}
            <footer id="contact" className="bg-[#0a0f1d] text-gray-400 pt-20 pb-10 border-t border-white/10">
                <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <img src="/image/LOGO SIJ.png" className="h-10 rounded p-1" alt="Logo Footer" onError={(e) => e.target.style.display='none'} />
                            <span className="text-xl font-bold text-white tracking-wider">PT SINO INDAH JAYA</span>
                        </div>
                        <p className="leading-relaxed mb-6 pr-10">
                            Mitra strategis dalam industri manufaktur otomotif. Kami berkomitmen memberikan kualitas terbaik dengan standar Korea.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Kontak</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <i className="fas fa-map-marker-alt text-amber-500 mt-1"></i>
                                <span>Blok Karang Gedong, Desa Wanasalam, Kec. Ligung, Majalengka.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="fas fa-phone-alt text-amber-500"></i>
                                <span className="font-bold text-white">(0233) - 8866 595</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Lokasi</h4>
                        <div className="w-full h-32 bg-slate-800 rounded-lg overflow-hidden relative group">
                            <iframe 
                                title="Peta Lokasi"
                                width="100%" 
                                height="100%" 
                                frameBorder="0" 
                                style={{border:0}} 
                                src="https://maps.google.com/maps?q=PT+SINO+INDAH+JAYA&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                                className="filter grayscale group-hover:grayscale-0 transition"
                            ></iframe>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-8 text-center text-sm">
                    © 2025 PT SINO INDAH JAYA. All Rights Reserved.
                </div>
            </footer>
        </div>
    );
}