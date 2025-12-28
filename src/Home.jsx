import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { db, collection, getDocs, query, orderBy } from './js/firebase.js'; 
import Navbar from './components/Navbar.jsx';

// --- IMPORT ICON DARI REACT-ICONS (Ganti CDN) ---
// Kita ambil icon dari paket FontAwesome (fa)
import { 
    FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube, // Sosmed
    FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, // Kontak
    FaExternalLinkAlt, FaArrowRight, FaSyncAlt, FaCircleNotch, FaCheckCircle // UI Lainnya
} from 'react-icons/fa';

export default function Home() {
    // --- STATE ---
    const [newsList, setNewsList] = useState([]);
    const [loadingNews, setLoadingNews] = useState(true);

    // --- EFFECT: Init & Data Fetching ---
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setLoadingNews(true);
        try {
            const q = query(collection(db, "news"), orderBy("date", "desc"));
            const querySnapshot = await getDocs(q);
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });
            setNewsList(items);
        } catch (error) {
            console.error("Gagal mengambil berita:", error);
        } finally {
            setLoadingNews(false);
        }
    };

    const formatDisplayDate = (firebaseDate) => {
        if (!firebaseDate) return "";
        if (firebaseDate.seconds) {
            return new Date(firebaseDate.seconds * 1000).toLocaleDateString("id-ID", {
                day: 'numeric', month: 'long', year: 'numeric'
            });
        }
        return firebaseDate;
    };

    return (
        <div className="overflow-x-hidden bg-slate-50 font-sans">
            
            <Navbar /> 

            {/* --- HERO SECTION --- */}
            <section id="home" className="relative min-h-screen flex items-center justify-start">
                <div className="absolute inset-0 z-0">
                    <img src="/image/alam.webp" className="w-full h-full object-cover" alt="Hero Background" onError={(e) => e.target.src='https://placehold.co/1920x1080'} />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 z-10 pt-20">
                    <div className="max-w-3xl" data-aos="fade-right">
                        <div className="inline-block bg-amber-500 text-[#0f172a] text-xs font-bold px-3 py-1 rounded mb-4 shadow-lg animate-pulse">
                            INVESTASI KOREA TERPERCAYA
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
                            Inovasi Manufaktur <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200 text-glow-gold">
                                Interior Otomotif
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-10 leading-relaxed border-l-4 border-amber-500 pl-6 shadow-black drop-shadow-md">
                            Produsen <strong>Covering Jok Mobil (Car Seat Cover)</strong> dan
                            komponen otomotif berteknologi tinggi di Majalengka. Mengutamakan
                            presisi, kualitas, dan standar global.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/produk" className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-[#0f172a] font-bold rounded-lg shadow-[0_0_20px_rgba(245,158,11,0.4)] transition transform hover:scale-105 flex items-center">
                                LIHAT PRODUK KAMI <FaArrowRight className="ml-2" />
                            </Link>
                            <a href="#about" className="px-8 py-4 border border-white text-white font-bold rounded-lg hover:bg-white hover:text-[#0f172a] transition transform hover:scale-105">
                                TENTANG KAMI
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- STATS SECTION --- */}
            <section className="relative z-20 -mt-16 px-6">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass p-8 rounded-2xl text-center text-white hover-3d" data-aos="fade-up" data-aos-delay="100">
                        <h3 className="text-5xl font-extrabold text-amber-400 mb-2">24k<span className="text-2xl">+</span></h3>
                        <p className="text-sm font-bold tracking-widest uppercase">Luas Area (m²)</p>
                    </div>
                    <div className="glass p-8 rounded-2xl text-center text-white hover-3d" data-aos="fade-up" data-aos-delay="200">
                        <h3 className="text-5xl font-extrabold text-amber-400 mb-2">100<span className="text-2xl">%</span></h3>
                        <p className="text-sm font-bold tracking-widest uppercase">Teknologi Korea</p>
                    </div>
                    <div className="glass p-8 rounded-2xl text-center text-white hover-3d" data-aos="fade-up" data-aos-delay="300">
                        <h3 className="text-5xl font-extrabold text-amber-400 mb-2">ISO<span className="text-2xl">+</span></h3>
                        <p className="text-sm font-bold tracking-widest uppercase">Standar Mutu</p>
                    </div>
                </div>
            </section>

            {/* --- ABOUT SECTION --- */}
            <section id="about" className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2" data-aos="fade-right">
                            <h4 className="text-blue-600 font-bold uppercase tracking-[0.2em] mb-4">Profil Perusahaan</h4>
                            <h2 className="text-4xl font-extrabold text-[#0f172a] mb-6">Presisi dalam Setiap Detail</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                <strong>PT SINO INDAH JAYA</strong> adalah perusahaan PMA Korea
                                yang berlokasi strategis di Wanasalam, Ligung, Majalengka. Kami
                                hadir sebagai solusi manufaktur modern untuk kebutuhan interior
                                otomotif.
                            </p>
                            <ul className="space-y-4 text-gray-700">
                                <li className="flex items-center gap-3"><FaCheckCircle className="text-amber-500 text-xl" /> Spesialisasi Cover Jok Mobil (Cutting & Sewing).</li>
                                <li className="flex items-center gap-3"><FaCheckCircle className="text-amber-500 text-xl" /> Penerapan UKL-UPL Ramah Lingkungan.</li>
                                <li className="flex items-center gap-3"><FaCheckCircle className="text-amber-500 text-xl" /> Tenaga Kerja Terlatih & Mesin Modern.</li>
                            </ul>
                        </div>
                        <div className="lg:w-1/2 relative" data-aos="fade-left">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                                <img src="/image/GEDUNGSIJ.jpg" className="w-full object-cover transform group-hover:scale-105 transition duration-700" alt="Gedung" onError={(e) => e.target.src='https://placehold.co/600x400'} />
                                <div className="absolute inset-0 bg-[#0f172a]/20 group-hover:bg-transparent transition"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PRODUCTS SECTION --- */}
            <section id="products" className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h4 className="text-blue-600 font-bold uppercase tracking-widest mb-4">Core Business</h4>
                        <h2 className="text-4xl font-extrabold text-[#0f172a]">Manufaktur Jok Mobil</h2>
                        <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded"></div>
                    </div>
                    
                    <div className="text-center mt-12">
                        <Link to="/produk" className="text-amber-600 font-bold hover:underline inline-flex items-center gap-2">
                            Lihat Semua Produk <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- BULLETIN / NEWS SECTION --- */}
            <section id="bulletin" className="py-24 bg-slate-100">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h4 className="text-blue-600 font-bold uppercase tracking-widest mb-2">Media Center</h4>
                            <h2 className="text-3xl font-extrabold text-[#0f172a]">Berita Perusahaan</h2>
                        </div>
                        <button onClick={fetchNews} className="bg-white px-4 py-2 rounded shadow hover:bg-blue-50 text-blue-600 font-bold transition flex items-center gap-2">
                            <FaSyncAlt className={loadingNews ? 'animate-spin' : ''} /> Refresh
                        </button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {loadingNews ? (
                            <div className="col-span-3 text-center py-12 bg-white rounded-xl shadow flex flex-col items-center justify-center">
                                <FaCircleNotch className="animate-spin text-4xl text-blue-600 mb-4" />
                                <p className="text-gray-500">Memuat Berita...</p>
                            </div>
                        ) : newsList.length === 0 ? (
                            <div className="col-span-3 text-center py-12 text-gray-500">Belum ada berita terbaru.</div>
                        ) : (
                            newsList.map((item) => (
                                <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col h-full" data-aos="fade-up">
                                    <Link to={`/news/${item.id}`} className="block h-48 overflow-hidden group">
                                        <img 
                                            src={item.imageURL || 'https://via.placeholder.com/400x200'} 
                                            className="w-full h-full object-cover transition duration-500 group-hover:scale-110" 
                                            alt="News" 
                                            onError={(e) => e.target.src='https://via.placeholder.com/400x200?text=No+Image'}
                                        />
                                    </Link>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="text-xs text-amber-600 font-bold mb-2 uppercase tracking-wide">
                                            {formatDisplayDate(item.date)}
                                        </div>
                                        <Link to={`/news/${item.id}`} className="hover:text-amber-600 transition">
                                            <h3 className="text-xl font-bold text-[#0f172a] mb-3 line-clamp-2">{item.title}</h3>
                                        </Link>
                                        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">{item.content}</p>
                                        <Link to={`/news/${item.id}`} className="text-sm font-bold text-blue-600 hover:underline mt-auto flex items-center gap-1">
                                            Baca Selengkapnya <FaArrowRight />
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* --- FOOTER (VERSI CLI / REACT-ICONS) --- */}
            <footer id="contact" className="bg-[#050b14] text-gray-400 pt-16 pb-8 border-t border-gray-800 font-sans">
                <div className="container mx-auto px-6 lg:px-12">
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        
                        {/* KOLOM 1: Identitas & Social Media */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <img src="/image/logosij.png" className="h-12 w-auto object-contain" alt="Logo Footer" onError={(e) => {e.target.style.display='none'}} />
                                <div>
                                    <h3 className="text-xl font-bold text-white tracking-wide">PT SINO INDAH JAYA</h3>
                                    <p className="text-xs text-gray-500">Automotive Interior Manufacturer</p>
                                </div>
                            </div>
                            
                            <p className="text-sm leading-relaxed text-gray-400">
                                Mitra strategis dalam industri manufaktur otomotif. Kami berkomitmen memberikan kualitas terbaik dengan standar Korea dan presisi tinggi.
                            </p>

                            {/* SOCIAL MEDIA SECTION */}
                            <div>
                                <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Ikuti Kami</h3>
                                <div className="flex space-x-3">
                                    {/* Menggunakan React Components, bukan tag <i> */}
                                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-[#1877F2] hover:-translate-y-1 transition-all duration-300 shadow-lg group">
                                        <FaFacebookF className="text-lg group-hover:scale-110 transition" />
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:-translate-y-1 transition-all duration-300 shadow-lg group">
                                        <FaInstagram className="text-lg group-hover:scale-110 transition" />
                                    </a>
                                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-[#0A66C2] hover:-translate-y-1 transition-all duration-300 shadow-lg group">
                                        <FaLinkedinIn className="text-lg group-hover:scale-110 transition" />
                                    </a>
                                    <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-black hover:text-cyan-400 hover:border hover:border-gray-600 hover:-translate-y-1 transition-all duration-300 shadow-lg group">
                                        <FaTiktok className="text-lg group-hover:scale-110 transition" />
                                    </a>
                                    <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-[#FF0000] hover:-translate-y-1 transition-all duration-300 shadow-lg group">
                                        <FaYoutube className="text-lg group-hover:scale-110 transition" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* KOLOM 2: Kontak */}
                        <div className="space-y-6">
                            <h3 className="text-white font-bold text-sm uppercase tracking-widest border-l-4 border-amber-500 pl-3">Kontak Perusahaan</h3>
                            
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4 group">
                                    <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <span className="text-sm text-gray-400 group-hover:text-gray-200 transition">
                                        Blok Karang Gedong, Desa Wanasalam,<br/>
                                        Kec. Ligung, Majalengka,<br/>
                                        Jawa Barat, Indonesia.
                                    </span>
                                </li>
                                <li className="flex items-center gap-4 group">
                                    <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition">
                                        <FaPhoneAlt />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-400 group-hover:text-white transition cursor-pointer">
                                        (0233) - 8866 595
                                    </span>
                                </li>
                                <li className="flex items-center gap-4 group">
                                    <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition">
                                        <FaEnvelope />
                                    </div>
                                    <span className="text-sm text-gray-400 group-hover:text-white transition cursor-pointer">
                                        contact@sinoindahjaya.com
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* KOLOM 3: Lokasi (Peta) */}
                        <div className="space-y-6">
                            <h3 className="text-white font-bold text-sm uppercase tracking-widest border-l-4 border-amber-500 pl-3">Lokasi Pabrik</h3>
                            
                            <div className="w-full h-48 bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 group hover:border-amber-500 transition-colors">
                                <iframe 
                                    title="Lokasi PT Sino Indah Jaya"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.333973163356!2d108.26123457499478!3d-6.729061593266986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f272a275727b5%3A0x629535099710373c!2sPT.%20Sino%20Indah%20Jaya!5e0!3m2!1sid!2sid!4v1703666666666!5m2!1sid!2sid" 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade">
                                </iframe>
                            </div>
                            <a href="https://maps.app.goo.gl/XXXXXX" target="_blank" rel="noreferrer" className="text-xs text-amber-500 hover:text-amber-400 underline flex items-center gap-2">
                                <FaExternalLinkAlt /> Buka di Google Maps
                            </a>
                        </div>
                    </div>

                    <hr className="border-gray-800 my-8" />

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                        <p>© 2025 <span className="text-gray-300 font-semibold">PT SINO INDAH JAYA</span>. All Rights Reserved.</p>
                        <p className="flex gap-4">
                            <a href="#" className="hover:text-white transition">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition">Terms of Service</a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}