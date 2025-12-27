import React, { useState, useEffect, useRef, useCallback } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
// Sesuaikan path ini dengan struktur folder Anda (js/firebase.js)
import { auth, signOut, onAuthStateChanged, db } from './js/firebase.js'; 
import { 
    collection, 
    getDocs, 
    doc, 
    deleteDoc, 
    updateDoc, 
    addDoc, 
    query, 
    orderBy, 
    serverTimestamp 
} from 'firebase/firestore';

export default function Admin() {
   
    // --- STATE MANAGEMENT ---
    const [user, setUser] = useState(null);
    const [loadingNews, setLoadingNews] = useState(true);
    const [newsList, setNewsList] = useState([]);
    const navigate = useNavigate(); // Hook untuk pindah halaman
    
    // State Form Berita
    const [newsForm, setNewsForm] = useState({
        id: '',
        title: '',
        date: '',
        imageURL: '',
        videoUrl: '',
        content: ''
    });

    // State Karir
    const [loadingCareers, setLoadingCareers] = useState(true);
    const [careerList, setCareerList] = useState([]);
    const [careerForm, setCareerForm] = useState({
        id: '', 
        title: '',
        type: 'Full Time',
        location: 'Majalengka',
        imageURL: '',
        description: ''
    });

    const [isSavingNews, setIsSavingNews] = useState(false);
    const [isSavingCareer, setIsSavingCareer] = useState(false);

    const newsFormRef = useRef(null);
    const careerFormRef = useRef(null);

    // --- KODE BARU (PENGGANTINYA) ---
    
    const ADMIN_EMAIL = "sij-connect01@gmail.com"; // 1. Tambahkan variabel ini

   // --- FUNGSI AUTO LOGOUT ---
    const autoLogout = useCallback(async () => {
        try {
            await signOut(auth);
            Swal.fire({
                icon: 'info',
                title: 'Sesi Berakhir',
                text: 'Sesi berakhir karena tidak ada aktivitas.',
                timer: 3000,
                showConfirmButton: false
            });
            navigate('/login');
        } catch (error) {
            console.error("Error during auto logout:", error);
        }
    }, [navigate]);

    // 3. EFFECT: AUTH CHECK + INACTIVITY TIMER
    useEffect(() => {
        let timer;
        const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 Menit

        const resetTimer = () => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(autoLogout, INACTIVITY_LIMIT);
        };

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                navigate('/login');
            } else if (currentUser.email !== ADMIN_EMAIL) {
                // ... logic akses ditolak ...
                navigate('/');
            } else {
                setUser(currentUser);
                loadNews();
                loadCareers();

                // Mulai dengerin aktivitas user
                const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
                events.forEach(event => window.addEventListener(event, resetTimer));
                resetTimer();
            }
        });

        return () => {
            unsubscribe();
            if (timer) clearTimeout(timer);
            ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => 
                window.removeEventListener(event, resetTimer)
            );
        };
    }, [navigate, autoLogout]);

    // --- LOGIC: BERITA (NEWS) ---
    const loadNews = async () => {
        setLoadingNews(true);
        try {
            const q = query(collection(db, "news"), orderBy("date", "desc"));
            const querySnapshot = await getDocs(q);
            const items = [];
            querySnapshot.forEach((docSnap) => {
                items.push({ id: docSnap.id, ...docSnap.data() });
            });
            setNewsList(items);
        } catch (error) {
            console.error("Error loading news:", error);
        } finally {
            setLoadingNews(false);
        }
    };

    const updateNewsFormState = (key, value) => {
        setNewsForm(prev => ({ ...prev, [key]: value }));
    }

    const handleEditNews = (data) => {
        let formattedDate = data.date;
        if (data.date && data.date.seconds) {
            const dateObj = new Date(data.date.seconds * 1000);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            formattedDate = `${year}-${month}-${day}`;
        }

        setNewsForm({
            id: data.id,
            title: data.title || '',
            date: formattedDate || '',
            imageURL: data.imageURL || '',
            videoUrl: data.videoUrl || '',
            content: data.content || ''
        });
        
        newsFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDeleteNews = async (id, title) => {
        if (confirm(`Hapus berita "${title}"?`)) {
            try {
                await deleteDoc(doc(db, "news", id));
                loadNews();
            } catch (error) {
                alert("Gagal hapus: " + error.message);
            }
        }
    };

    const submitNews = async (e) => {
        e.preventDefault();
        setIsSavingNews(true);

        const newData = {
            title: newsForm.title,
            date: newsForm.date,
            imageURL: newsForm.imageURL,
            videoUrl: newsForm.videoUrl,
            content: newsForm.content,
            category: "Corporate"
        };

        try {
            if (newsForm.id) {
                await updateDoc(doc(db, "news", newsForm.id), newData);
            } else {
                await addDoc(collection(db, "news"), newData);
            }
            Swal.fire('Sukses', 'Berita berhasil disimpan!', 'success');
            resetNewsForm();
            loadNews();
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        } finally {
            setIsSavingNews(false);
        }
    };

    const resetNewsForm = () => {
        setNewsForm({
            id: '', title: '', date: '', imageURL: '', videoUrl: '', content: ''
        });
    };

    // --- LOGIC: KARIR (CAREERS) ---
    const loadCareers = async () => {
        setLoadingCareers(true);
        try {
            const q = query(collection(db, "careers"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const items = [];
            querySnapshot.forEach((docSnap) => {
                items.push({ id: docSnap.id, ...docSnap.data() });
            });
            setCareerList(items);
        } catch (error) {
            console.error("Error loading careers:", error);
        } finally {
            setLoadingCareers(false);
        }
    };

    const handleEditCareer = (data) => {
        setCareerForm({
            id: data.id,
            title: data.title,
            type: data.type,
            location: data.location,
            imageURL: data.imageURL || '',
            description: data.description || ''
        });
        careerFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDeleteCareer = async (id, title) => {
        if (confirm(`Hapus lowongan "${title}"?`)) {
            try {
                await deleteDoc(doc(db, "careers", id));
                loadCareers();
            } catch (error) {
                alert("Gagal hapus loker: " + error.message);
            }
        }
    };

    const submitCareer = async (e) => {
        e.preventDefault();
        setIsSavingCareer(true);

        const careerData = {
            title: careerForm.title,
            type: careerForm.type,
            location: careerForm.location,
            imageURL: careerForm.imageURL,
            description: careerForm.description,
            createdAt: serverTimestamp()
        };

        try {
            if (careerForm.id) {
                delete careerData.createdAt; 
                await updateDoc(doc(db, "careers", careerForm.id), careerData);
                Swal.fire('Sukses', 'Lowongan diperbarui!', 'success');
            } else {
                await addDoc(collection(db, "careers"), careerData);
                Swal.fire('Sukses', 'Lowongan diposting!', 'success');
            }
            resetCareerForm();
            loadCareers();
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        } finally {
            setIsSavingCareer(false);
        }
    };

    const resetCareerForm = () => {
        setCareerForm({
            id: '', title: '', type: 'Full Time', location: 'Majalengka', imageURL: '', description: ''
        });
    };

   // --- LOGIC: LOGOUT (PERBAIKAN) ---
    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Yakin ingin keluar?',
            text: "Sesi admin akan diakhiri",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Keluar',
            cancelButtonText: 'Batal'
        });

        if (result.isConfirmed) {
            try {
                // 1. Tampilkan Loading
                Swal.fire({
                    title: 'Mengakhiri sesi...',
                    allowOutsideClick: false,
                    didOpen: () => { Swal.showLoading(); }
                });

                // 2. Proses Logout Firebase
                await signOut(auth);
                
                // 3. TUTUP POPUP SECARA PAKSA (Ini kuncinya!)
                // Supaya saat pindah ke halaman Login, layarnya bersih
                Swal.close(); 

            } catch (error) {
                Swal.fire('Error', 'Gagal Logout: ' + error.message, 'error');
            }
        }
    };
    const formatDisplayDate = (firebaseDate) => {
        if (!firebaseDate) return "-";
        if (firebaseDate.seconds) {
            return new Date(firebaseDate.seconds * 1000).toLocaleDateString("id-ID");
        }
        return firebaseDate;
    };

    const getBadgeColor = (type) => {
        if (type === 'Full Time') return 'bg-green-100 text-green-700';
        if (type === 'Internship') return 'bg-purple-100 text-purple-700';
        return 'bg-blue-100 text-blue-700';
    };

    return (
        <div className="bg-slate-100 font-sans min-h-screen">
            {/* NAV BAR */}
            <nav className="bg-[#0f172a] text-white p-4 shadow-lg sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <img 
                            src="image/logo.png" 
                            className="h-8 bg-white rounded p-1" 
                            onError={(e) => e.target.style.display='none'} 
                            alt="Logo"
                        />
                        <span className="font-bold text-lg">ADMIN DASHBOARD</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Ganti a href ke path root ('/') untuk SPA */}
                        <a href="/" target="_blank" className="text-sm bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition decoration-0">
                            <i className="fas fa-external-link-alt mr-2"></i>Web
                        </a>
                        <button onClick={handleLogout} className="text-sm bg-red-600 px-4 py-2 rounded hover:bg-red-500 transition cursor-pointer">
                            <i className="fas fa-sign-out-alt mr-2"></i>Keluar
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-6 py-8 space-y-12">
                
                {/* GRID BERITA */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* KOLOM KIRI: FORM INPUT BERITA */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 sticky top-24">
                            <h2 className="text-xl font-bold text-[#0f172a] mb-6 border-b pb-2">
                                <i className="fas fa-edit mr-2"></i>Kelola Berita
                            </h2>
                            
                            <form ref={newsFormRef} onSubmit={submitNews} className="space-y-4">
                                <input type="hidden" value={newsForm.id} /> 
                                
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Judul Berita</label>
                                    <input 
                                        type="text" 
                                        value={newsForm.title}
                                        onChange={(e) => updateNewsFormState('title', e.target.value)}
                                        required 
                                        className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" 
                                        placeholder="Contoh: Kunjungan Direksi..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Tanggal</label>
                                    <input 
                                        type="date" 
                                        value={newsForm.date}
                                        onChange={(e) => updateNewsFormState('date', e.target.value)}
                                        required 
                                        className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" 
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Link Gambar (URL)</label>
                                    <input 
                                        type="url" 
                                        value={newsForm.imageURL}
                                        onChange={(e) => updateNewsFormState('imageURL', e.target.value)}
                                        className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" 
                                        placeholder="https://..."
                                    />
                                    <p className="text-xs text-gray-400 mt-1">*Copy link gambar dari Google/Internet</p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Link Video (Opsional)</label>
                                    <input 
                                        type="url" 
                                        value={newsForm.videoUrl}
                                        onChange={(e) => updateNewsFormState('videoUrl', e.target.value)}
                                        className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" 
                                        placeholder="https://youtube.com/..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi</label>
                                    <textarea 
                                        rows="4" 
                                        value={newsForm.content}
                                        onChange={(e) => updateNewsFormState('content', e.target.value)}
                                        required 
                                        className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" 
                                        placeholder="Isi berita..."
                                    ></textarea>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <button 
                                        type="submit" 
                                        disabled={isSavingNews}
                                        className="flex-1 bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700 transition disabled:opacity-50"
                                    >
                                        {isSavingNews ? 'Loading...' : (
                                            newsForm.id ? <><i className="fas fa-sync-alt mr-2"></i> UPDATE</> : <><i className="fas fa-save mr-2"></i> SIMPAN</>
                                        )}
                                    </button>
                                    
                                    {newsForm.id && (
                                        <button 
                                            type="button" 
                                            onClick={resetNewsForm}
                                            className="bg-gray-500 text-white px-4 rounded font-bold hover:bg-gray-600 transition"
                                        >
                                            BATAL
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* KOLOM KANAN: LIST BERITA */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                            <h2 className="text-xl font-bold text-[#0f172a] mb-6 border-b pb-2">
                                <i className="fas fa-list mr-2"></i>Daftar Berita Aktif
                            </h2>
                            <div className="space-y-4">
                                {loadingNews ? (
                                    <div className="text-center py-8 text-gray-500 animate-pulse">Memuat data...</div>
                                ) : newsList.length === 0 ? (
                                    <div className="text-center text-gray-500">Belum ada berita.</div>
                                ) : (
                                    newsList.map((item) => (
                                        <div key={item.id} className="flex justify-between items-start bg-slate-50 p-4 rounded-lg border border-slate-200 hover:shadow-sm transition">
                                            <div className="flex gap-4 items-center">
                                                <img 
                                                    src={item.imageURL || 'https://via.placeholder.com/150'} 
                                                    className="w-16 h-16 object-cover rounded bg-gray-200" 
                                                    alt="img" 
                                                    onError={(e) => e.target.src='https://via.placeholder.com/150'}
                                                />
                                                <div>
                                                    <h4 className="font-bold text-[#0f172a] line-clamp-1">{item.title || 'Tanpa Judul'}</h4>
                                                    <p className="text-xs text-gray-500 mb-1">
                                                        <i className="far fa-calendar-alt mr-1"></i> {formatDisplayDate(item.date)}
                                                    </p>
                                                    <p className="text-xs text-gray-400 line-clamp-1 w-48">{item.content || '-'}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <button 
                                                    onClick={() => handleEditNews(item)}
                                                    className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 font-bold transition"
                                                >
                                                    <i className="fas fa-edit"></i> Edit
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteNews(item.id, item.title)}
                                                    className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 font-bold transition"
                                                >
                                                    <i className="fas fa-trash"></i> Hapus
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-slate-300" />

                {/* SECTION LOKER */}
                <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-amber-500">
                    <h2 className="text-2xl font-bold text-[#0f172a] mb-6 flex items-center gap-2">
                        <i className="fas fa-briefcase"></i> Kelola Lowongan Karir
                    </h2>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* FORM LOKER */}
                        <div className="lg:col-span-1 border-r border-slate-200 pr-6">
                           <form ref={careerFormRef} onSubmit={submitCareer} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700">Posisi / Jabatan</label>
                                    <input 
                                        type="text" 
                                        value={careerForm.title}
                                        onChange={(e) => setCareerForm({...careerForm, title: e.target.value})}
                                        required 
                                        className="w-full border p-2 rounded focus:ring-2 focus:ring-amber-500 outline-none" 
                                        placeholder="Contoh: Operator Produksi"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700">Tipe</label>
                                        <select 
                                            value={careerForm.type}
                                            onChange={(e) => setCareerForm({...careerForm, type: e.target.value})}
                                            className="w-full border p-2 rounded"
                                        >
                                            <option value="Full Time">Full Time</option>
                                            <option value="Contract">Kontrak</option>
                                            <option value="Internship">Magang</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700">Lokasi</label>
                                        <input 
                                            type="text" 
                                            value={careerForm.location}
                                            onChange={(e) => setCareerForm({...careerForm, location: e.target.value})}
                                            className="w-full border p-2 rounded"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700">Link Gambar (Poster/Flyer)</label>
                                    <input 
                                        type="url" 
                                        value={careerForm.imageURL}
                                        onChange={(e) => setCareerForm({...careerForm, imageURL: e.target.value})}
                                        className="w-full border p-2 rounded focus:ring-2 focus:ring-amber-500 outline-none" 
                                        placeholder="https://..."
                                    />
                                    <p className="text-xs text-gray-400 mt-1">*Opsional: Masukkan link gambar poster lowongan jika ada.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700">Persyaratan / Deskripsi</label>
                                    <textarea 
                                        rows="4" 
                                        value={careerForm.description}
                                        onChange={(e) => setCareerForm({...careerForm, description: e.target.value})}
                                        required 
                                        className="w-full border p-2 rounded focus:ring-2 focus:ring-amber-500 outline-none" 
                                        placeholder="Minimal SMA/SMK, pengalaman 1 tahun..."
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isSavingCareer}
                                    className={`w-full font-bold py-2 rounded transition ${
                                        careerForm.id ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-amber-500 hover:bg-amber-400 text-[#0f172a]'
                                    }`}
                                >
                                    {isSavingCareer ? 'Processing...' : (
                                        careerForm.id ? <><i className="fas fa-sync-alt mr-2"></i>UPDATE LOKER</> : <><i className="fas fa-plus-circle mr-2"></i>POSTING LOKER</>
                                    )}
                                </button>
                                
                                {careerForm.id && (
                                    <button 
                                        type="button"
                                        onClick={resetCareerForm}
                                        className="w-full bg-gray-200 text-gray-600 font-bold py-2 rounded hover:bg-gray-300 transition mt-2"
                                    >
                                        BATAL EDIT
                                    </button>
                                )}
                            </form>
                        </div>

                        {/* LIST LOKER */}
                        <div className="lg:col-span-2">
                            <h3 className="font-bold text-gray-500 mb-4 text-sm uppercase">Loker Sedang Tayang</h3>
                            <div className="space-y-3">
                                {loadingCareers ? (
                                    <p className="text-center text-gray-400">Memuat data...</p>
                                ) : careerList.length === 0 ? (
                                    <p className="text-center text-gray-400 text-sm">Belum ada lowongan aktif.</p>
                                ) : (
                                    careerList.map((item) => (
                                        <div key={item.id} className="border-l-4 border-amber-500 bg-white shadow-sm p-3 rounded flex justify-between items-center group hover:bg-amber-50 transition">
                                            <div className="flex items-center flex-1">
                                                {item.imageURL ? (
                                                    <img 
                                                        src={item.imageURL} 
                                                        className="w-12 h-12 object-cover rounded mr-3 border" 
                                                        onError={(e) => e.target.style.display='none'}
                                                        alt="Job"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 bg-gray-100 rounded mr-3 flex items-center justify-center text-xs text-gray-400">
                                                        <i className="fas fa-image"></i>
                                                    </div>
                                                )}
                                                
                                                <div>
                                                    <h5 className="font-bold text-slate-800 text-sm">{item.title}</h5>
                                                    <div className="flex gap-2 mt-1 items-center">
                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${getBadgeColor(item.type)}`}>
                                                            {item.type}
                                                        </span>
                                                        <span className="text-[10px] text-gray-500">
                                                            <i className="fas fa-map-marker-alt"></i> {item.location}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-1 ml-2">
                                                <button 
                                                    onClick={() => handleEditCareer(item)}
                                                    className="text-amber-500 hover:text-amber-700 p-2" 
                                                    title="Edit"
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteCareer(item.id, item.title)}
                                                    className="text-red-400 hover:text-red-600 p-2" 
                                                    title="Hapus"
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}