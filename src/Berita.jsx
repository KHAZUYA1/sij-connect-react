import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { db, collection, getDocs, query, orderBy } from './js/firebase.js';

// Import Navbar Baru (Otomatis ada tombol Logout/Dashboard)
import Navbar from './components/Navbar.jsx';

export default function Berita() {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
        
        const fetchNews = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, "news"), orderBy("date", "desc"));
                const querySnapshot = await getDocs(q);
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push({ id: doc.id, ...doc.data() });
                });
                setNewsList(items);
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    // Helper format tanggal
    const formatDisplayDate = (timestamp) => {
        if (!timestamp) return "";
        if (timestamp.seconds) {
            return new Date(timestamp.seconds * 1000).toLocaleDateString('id-ID', { 
                day: 'numeric', month: 'long', year: 'numeric' 
            });
        }
        return "";
    };

    return (
        <div className="bg-slate-50 font-sans min-h-screen flex flex-col">
            
            {/* 1. Navbar */}
            <Navbar />

            {/* 2. Header Section */}
            <header className="relative bg-[#0f172a] text-white py-24 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                <div className="container mx-auto px-4 relative z-10" data-aos="fade-up">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                        Berita & <span className="text-amber-400">Artikel</span>
                    </h1>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                        Informasi terbaru seputar kegiatan perusahaan, inovasi teknologi, dan pengumuman penting lainnya.
                    </p>
                </div>
            </header>

            {/* 3. List Berita */}
            <section className="container mx-auto px-6 py-16 flex-grow">
                
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
                        <p className="text-gray-500 mt-4">Memuat berita...</p>
                    </div>
                ) : newsList.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                        <i className="far fa-newspaper text-4xl text-gray-300 mb-4 block"></i>
                        <h3 className="text-lg font-bold text-slate-400">Belum Ada Berita</h3>
                        <p className="text-slate-400 text-sm">Cek kembali nanti ya!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {newsList.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col h-full border border-gray-100 group" data-aos="fade-up">
                                {/* Image */}
                                <Link to={`/news/${item.id}`} className="block h-52 overflow-hidden relative">
                                    <img 
                                        src={item.imageURL || 'https://via.placeholder.com/400x200'} 
                                        className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                                        alt={item.title} 
                                        onError={(e) => e.target.src='https://via.placeholder.com/400x200?text=No+Image'}
                                    />
                                    <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                        {item.category || 'Update'}
                                    </div>
                                </Link>
                                
                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="text-xs text-gray-400 font-bold mb-3 flex items-center gap-2">
                                        <i className="far fa-calendar-alt text-amber-500"></i>
                                        {formatDisplayDate(item.date)}
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-[#0f172a] mb-3 line-clamp-2 leading-snug group-hover:text-amber-600 transition">
                                        <Link to={`/news/${item.id}`}>{item.title}</Link>
                                    </h3>
                                    
                                    <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                                        {item.content}
                                    </p>
                                    
                                    <div className="mt-auto flex justify-between items-center border-t border-gray-100 pt-4">
                                        <Link to={`/news/${item.id}`} className="text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-2">
                                            BACA SELENGKAPNYA <i className="fas fa-arrow-right"></i>
                                        </Link>
                                        {item.videoUrl && (
                                            <i className="fab fa-youtube text-red-500 text-lg" title="Video Available"></i>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* 4. Footer */}
            <footer className="bg-[#0f172a] text-gray-400 py-12 text-center border-t border-slate-800 mt-auto">
                <p>&copy; 2025 PT SINO INDAH JAYA. All Rights Reserved.</p>
            </footer>
        </div>
    );
}