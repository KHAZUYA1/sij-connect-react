import React, { useEffect } from 'react';
import Navbar from './components/Navbar.jsx'; // Menggunakan Navbar baru
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Produk() {
    // --- EFFECT ---
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    return (
        <div className="overflow-x-hidden bg-slate-50 font-sans">
            
            {/* --- NAVBAR BARU (Otomatis Tombol Logout/Dashboard) --- */}
            <Navbar />

            {/* --- HERO SECTION (TIDAK BERUBAH) --- */}
            <section className="relative pt-32 pb-20 bg-[#0f172a] text-center overflow-hidden">
                {/* Background Pattern CSS Local */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                
                <div className="container mx-auto px-6 relative z-10">
                    <h4 className="text-amber-400 font-bold uppercase tracking-[0.3em] mb-4 text-sm" data-aos="fade-down">Core Business</h4>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6" data-aos="fade-up">Manufaktur Jok Mobil</h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto border-t border-white/10 pt-6" data-aos="fade-up" data-aos-delay="100">
                        Spesialisasi dalam proses <strong>Cutting & Sewing</strong> untuk menghasilkan interior otomotif presisi tinggi bagi pasar OEM.
                    </p>
                </div>
            </section>

            {/* --- PRODUCTION FLOW (TIDAK BERUBAH) --- */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-[#0f172a]">Alur Produksi</h2>
                        <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded"></div>
                        <p className="text-gray-500 mt-4">Dari Bahan Mentah hingga Supply ke Buyer</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        
                        {/* Card 1: Cutting */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 group flex flex-col h-full" data-aos="fade-up">
                            <div className="h-60 overflow-hidden relative">
                                <img src="/image/cutting.jpeg" className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" alt="Cutting" onError={(e) => e.target.src='https://placehold.co/600x400?text=Cutting+Process'} />
                                <div className="absolute top-0 left-0 bg-blue-600 text-white font-bold px-4 py-2 rounded-br-xl">01</div>
                            </div>
                            <div className="p-8 flex-grow">
                                <div className="flex items-center gap-3 mb-4">
                                    <i className="fas fa-cut text-2xl text-amber-500"></i>
                                    <h3 className="text-xl font-bold text-[#0f172a]">Cutting Process</h3>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Pemrosesan bahan mentah (Raw Material) berupa Leather atau Fabric. Menggunakan mesin cutting otomatis berteknologi tinggi untuk memastikan pola yang presisi dan minim limbah.
                                </p>
                            </div>
                        </div>

                        {/* Card 2: Sewing */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 group flex flex-col h-full" data-aos="fade-up" data-aos-delay="100">
                            <div className="h-60 overflow-hidden relative">
                                <img src="/image/prodproses.jpg" className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" alt="Sewing" onError={(e) => e.target.src='https://placehold.co/600x400?text=Sewing+Process'} />
                                <div className="absolute top-0 left-0 bg-blue-600 text-white font-bold px-4 py-2 rounded-br-xl">02</div>
                            </div>
                            <div className="p-8 flex-grow">
                                <div className="flex items-center gap-3 mb-4">
                                    <i className="fas fa-tshirt text-2xl text-amber-500"></i>
                                    <h3 className="text-xl font-bold text-[#0f172a]">Sewing Process</h3>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Tahap penggabungan pola melalui proses jahit (Sewing). Didukung oleh tenaga ahli dan mesin modern untuk menghasilkan jahitan <em>Double Stitch</em> yang kuat, rapi, dan sesuai standar keamanan otomotif.
                                </p>
                            </div>
                        </div>

                        {/* Card 3: Supply */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 group flex flex-col h-full" data-aos="fade-up" data-aos-delay="200">
                            <div className="h-60 overflow-hidden relative bg-slate-800 flex items-center justify-center">
                                 <i className="fas fa-truck-loading text-6xl text-amber-400 group-hover:scale-110 transition duration-500"></i>
                                 <div className="absolute top-0 left-0 bg-blue-600 text-white font-bold px-4 py-2 rounded-br-xl">03</div>
                            </div>
                            <div className="p-8 flex-grow">
                                <div className="flex items-center gap-3 mb-4">
                                    <i className="fas fa-handshake text-2xl text-amber-500"></i>
                                    <h3 className="text-xl font-bold text-[#0f172a]">Supply to Buyer</h3>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Produk jadi (Finished Goods) yang telah lolos Quality Control (QC) ketat didistribusikan langsung ke pabrik perakitan mobil (Buyer) atau gudang utama mitra kami tepat waktu.
                                </p>
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
                            <img src="/image/logosij.png" className="h-10 rounded p-1" alt="Logo Footer" onError={(e) => e.target.style.display='none'} />
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