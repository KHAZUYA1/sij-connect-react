import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Untuk navigasi tanpa refresh
import Navbar from './components/Navbar.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swal from 'sweetalert2';
import { db, collection, getDocs, query, orderBy } from './js/firebase.js';

export default function Karir() {
    // --- STATE ---
    const [allJobs, setAllJobs] = useState([]); // Data mentah dari DB
    const [filteredJobs, setFilteredJobs] = useState([]); // Data yang ditampilkan
    const [loading, setLoading] = useState(true);
    
    // State Filter
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');

    // --- EFFECT: Init & Fetch Data ---
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
        fetchCareers();
    }, []);

    // --- LOGIC: Ambil Data Firebase ---
    const fetchCareers = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "careers"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            
            const jobs = [];
            querySnapshot.forEach((doc) => {
                jobs.push({ id: doc.id, ...doc.data() });
            });

            setAllJobs(jobs);
            setFilteredJobs(jobs); // Awalnya tampilkan semua
        } catch (error) {
            console.error("Error fetching careers:", error);
            Swal.fire("Error", "Gagal memuat data lowongan.", "error");
        } finally {
            setLoading(false);
        }
    };

    // --- LOGIC: Filter ---
    const handleFilter = () => {
        const result = allJobs.filter(job => {
            const matchTitle = job.title.toLowerCase().includes(keyword.toLowerCase());
            const matchLocation = location === "" || job.location.includes(location);
            return matchTitle && matchLocation;
        });
        setFilteredJobs(result);
        
        // Refresh animasi saat hasil filter berubah
        setTimeout(() => AOS.refresh(), 100); 
    };

    // Trigger filter saat enter ditekan di input search
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleFilter();
    };

    // --- LOGIC: Popup Gambar ---
    const showBrochure = (url, title) => {
        Swal.fire({
            imageUrl: url,
            imageAlt: title,
            title: title,
            text: 'Klik di luar gambar untuk menutup',
            width: 600,
            padding: '1em',
            showConfirmButton: false,
            showCloseButton: true,
            backdrop: `rgba(0,0,0,0.8)`
        });
    };

    // Helper Styles
    const getBadgeClass = (type) => {
        if (type === 'Contract') return "bg-green-100 text-green-700 border-green-200";
        if (type === 'Internship') return "bg-purple-100 text-purple-700 border-purple-200";
        return "bg-blue-100 text-blue-700 border-blue-200"; // Full Time
    };

    return (
        <div className="bg-slate-50 font-sans min-h-screen">
            
            {/* NAVBAR (Sesuai HTML Karir) */}
            <nav className="bg-[#0f172a] text-white p-4 sticky top-0 z-50 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-3">
                        {/* Pastikan gambar ada di public/image */}
                        <img src="/image/logosij.png" className="h-10  rounded p-1" alt="Logo SIJ" onError={(e) => e.target.src='https://placehold.co/40x40?text=SIJ'} />
                        <span className="font-bold text-lg hidden md:block">PT SINO INDAH JAYA</span>
                    </Link>
                    <div className="flex gap-4">
                        <Link to="/" className="hover:text-amber-400 transition">Beranda</Link>
                        <Link to="/produk" className="hover:text-amber-400 transition">Produk</Link>
                        <Link to="/karir" className="text-amber-400 font-bold border-b-2 border-amber-400">Karir</Link>
                    </div>
                </div>
            </nav>

            {/* HEADER */}
            <header className="relative bg-[#0f172a] text-white py-24 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="container mx-auto px-4 relative z-10" data-aos="fade-up">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Bergabunglah Bersama <span className="text-amber-400">Tim Terbaik</span>
                    </h1>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                        Jadilah bagian dari inovasi manufaktur interior otomotif berstandar Korea. 
                        Temukan peluang karir yang sesuai dengan potensi Anda.
                    </p>
                </div>
            </header>

            {/* SEARCH SECTION */}
            <section className="container mx-auto px-4 -mt-10 relative z-20 mb-16">
                <div className="bg-white p-6 rounded-2xl shadow-xl max-w-5xl mx-auto flex flex-col md:flex-row gap-4 border border-gray-100">
                    <div className="flex-1 relative">
                        <i className="fas fa-search absolute left-5 top-4 text-gray-400"></i>
                        <input 
                            type="text" 
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Cari posisi (Contoh: Operator, Staff)..." 
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                        />
                    </div>
                    <select 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                    >
                        <option value="">Semua Lokasi</option>
                        <option value="Majalengka">Majalengka</option>
                        <option value="Cirebon">Cirebon</option>
                    </select>
                    <button 
                        onClick={handleFilter}
                        className="bg-amber-500 text-[#0f172a] px-8 py-3 rounded-xl hover:bg-amber-400 transition font-bold shadow-lg shadow-amber-500/30 transform hover:scale-105"
                    >
                        Cari Lowongan
                    </button>
                </div>
            </section>

            {/* JOB LIST SECTION */}
            <section className="container mx-auto px-4 pb-24">
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-8 w-1 bg-amber-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-slate-800">Posisi Terbaru</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <div className="col-span-1 md:col-span-3 text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
                            <p className="text-gray-500 mt-4 font-medium">Sedang memuat data lowongan...</p>
                        </div>
                    ) : filteredJobs.length === 0 ? (
                        <div className="col-span-1 md:col-span-3 text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                            <i className="far fa-frown text-4xl text-gray-300 mb-4 block"></i>
                            <h3 className="text-lg font-bold text-slate-400">Belum Ada Lowongan</h3>
                            <p className="text-slate-400 text-sm">Cek kembali nanti atau ubah kata kunci pencarian.</p>
                        </div>
                    ) : (
                        filteredJobs.map((job) => (
                            <div key={job.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-slate-100 flex flex-col h-full group" data-aos="fade-up">
                                
                                {/* Image / Poster */}
                                <div 
                                    className="relative h-48 overflow-hidden bg-gray-100 cursor-zoom-in group-image"
                                    onClick={() => showBrochure(job.imageURL || 'https://placehold.co/600x400/eee/999?text=No+Image', job.title)}
                                >
                                    <img 
                                        src={job.imageURL || 'https://placehold.co/600x400/eee/999?text=No+Image'} 
                                        alt={job.title} 
                                        className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                        onError={(e) => e.target.src='https://placehold.co/600x400/eee/999?text=No+Image'}
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition flex items-center justify-center">
                                        <span className="opacity-0 group-hover:opacity-100 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm transition">
                                            <i className="fas fa-search-plus mr-1"></i> Lihat Brosur
                                        </span>
                                    </div>
                                    <div className="absolute top-3 left-3">
                                        <span className={`${getBadgeClass(job.type)} text-xs font-bold px-3 py-1 rounded-full border shadow-sm`}>
                                            {job.type}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-slate-800 mb-2 leading-snug group-hover:text-amber-600 transition">
                                            {job.title}
                                        </h3>
                                        <div className="flex items-center text-gray-500 text-sm gap-4">
                                            <span className="flex items-center"><i className="fas fa-map-marker-alt text-amber-500 mr-2"></i> {job.location}</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
                                        {job.description}
                                    </p>
                                    
                                    {/* Action Buttons */}
                                    <div className="pt-4 border-t border-gray-100 mt-auto space-y-2">
                                        <a 
                                            href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo Admin HRD PT Sino Indah Jaya, saya tertarik melamar posisi ${job.title}`)}`}
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="flex items-center justify-center w-full bg-green-500 text-white py-2 rounded-xl font-bold hover:bg-green-600 transition-all shadow-md text-sm"
                                        >
                                            <i className="fab fa-whatsapp mr-2 text-lg"></i> Lamar via WhatsApp
                                        </a>
                                        
                                        <a 
                                            href={`mailto:hrd@sinoindahjaya.com?subject=${encodeURIComponent(`Lamar Pekerjaan: ${job.title}`)}`}
                                            className="flex items-center justify-center w-full bg-blue-600 text-white py-2 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md text-sm"
                                        >
                                            <i className="fas fa-envelope mr-2"></i> Kirim CV via Email
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-[#0f172a] text-gray-400 py-8 text-center border-t border-slate-800">
                <p>&copy; 2025 PT SINO INDAH JAYA. All Rights Reserved.</p>
            </footer>
        </div>
    );
}