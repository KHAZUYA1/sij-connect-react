import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // useParams untuk ambil ID dari URL
import Navbar from './components/Navbar.jsx';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './js/firebase.js';

export default function DetailNews() {
    const { id } = useParams(); // Ambil ID dari URL (misal: /news/123 -> id = 123)
    const [newsData, setNewsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Helper: Ambil ID YouTube
    const getYoutubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    useEffect(() => {
        const fetchDetail = async () => {
            if (!id) {
                setError("ID Berita tidak ditemukan.");
                setLoading(false);
                return;
            }

            try {
                const docRef = doc(db, "news", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setNewsData(docSnap.data());
                } else {
                    setError("Maaf, berita ini sudah dihapus atau tidak ditemukan.");
                }
            } catch (err) {
                console.error("Error fetching detail:", err);
                setError("Terjadi kesalahan koneksi.");
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [id]);

    // Format Tanggal
    const formatDate = (timestamp) => {
        if (timestamp && timestamp.seconds) {
            return new Date(timestamp.seconds * 1000).toLocaleDateString('id-ID', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
        }
        return "Baru saja";
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent mb-4"></div>
                <p className="text-slate-500">Memuat detail berita...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
                <i className="far fa-frown text-6xl text-slate-300 mb-4"></i>
                <p className="text-red-500 font-bold text-lg">{error}</p>
                <Link to="/" className="mt-4 px-6 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 transition">
                    Kembali ke Beranda
                </Link>
            </div>
        );
    }

    const videoId = getYoutubeId(newsData.videoUrl);

    return (
        <div className="bg-slate-50 font-sans min-h-screen">
            {/* NAVBAR SIMPLE */}
            <nav className="bg-[#0f172a] p-4 text-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 hover:text-amber-400 transition">
                        <i className="fas fa-arrow-left"></i> Kembali ke Berita
                    </Link>
                    <span className="font-bold tracking-widest text-sm text-amber-500">NEWS UPDATE</span>
                </div>
            </nav>

            <main className="container mx-auto px-6 py-10 max-w-4xl">
                <article className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
                    
                    {/* Header Image */}
                    <div className="h-[400px] w-full relative group">
                        <img 
                            src={newsData.imageURL || 'https://via.placeholder.com/800x400'} 
                            alt={newsData.title}
                            className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                            onError={(e) => e.target.src='https://via.placeholder.com/800x400?text=No+Image'}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 w-full">
                            <span className="bg-amber-500 text-[#0f172a] px-3 py-1 rounded text-xs font-bold uppercase mb-3 inline-block shadow-lg">
                                {newsData.category || 'News'}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-md">
                                {newsData.title}
                            </h1>
                            <p className="text-slate-300 mt-4 text-sm flex items-center gap-2">
                                <i className="far fa-calendar-alt text-amber-400"></i> 
                                <span>{formatDate(newsData.date)}</span>
                            </p>
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-8 md:p-12">
                        
                        {/* Video Player (Jika Ada) */}
                        {videoId && (
                            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg mb-10 border border-slate-200">
                                <iframe 
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${videoId}`} 
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}

                        {/* Text Content */}
                        <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
                            {newsData.content}
                        </div>
                    </div>
                </article>
            </main>

            <footer className="bg-[#0f172a] text-slate-500 text-center py-6 text-sm mt-12 border-t border-slate-800">
                &copy; 2025 PT SINO INDAH JAYA.
            </footer>
        </div>
    );
}