const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-[#0a0f1d] text-gray-400 pt-20 pb-10 border-t border-white/10"
    >
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
        {/* KOLOM 1: INFO PERUSAHAAN */}
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <img 
                src="/image/LOGO SIJ.png" 
                alt="Logo Footer"
                className="h-10 rounded p-1" 
            />
            <span className="text-xl font-bold text-white tracking-wider">
              PT SINO INDAH JAYA
            </span>
          </div>
          <p className="leading-relaxed mb-6 pr-10">
            Mitra strategis dalam industri manufaktur otomotif. Kami berkomitmen
            memberikan kualitas terbaik dengan standar Korea untuk pasar
            Indonesia dan Global.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 hover:text-[#0f172a] flex items-center justify-center transition"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 hover:text-[#0f172a] flex items-center justify-center transition"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* KOLOM 2: KONTAK */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider">
            Kontak
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <i className="fas fa-map-marker-alt text-amber-500 mt-1"></i>
              <span>
                Blok Karang Gedong, Desa Wanasalam, Kec. Ligung, Majalengka.
              </span>
            </li>
            <li className="flex items-center gap-3">
              <i className="fas fa-phone-alt text-amber-500"></i>
              <span className="font-bold text-white">(0233) - 8866 595</span>
            </li>
          </ul>
        </div>

        {/* KOLOM 3: LOKASI (PETA) */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider">
            Lokasi
          </h4>
          <div className="w-full h-32 bg-slate-800 rounded-lg overflow-hidden relative group">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.3333466636746!2d108.2677!3d-6.729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDMnNDQuNCJTIDEwOMKwMTYnMDMuNyJF!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid"
              className="filter grayscale group-hover:grayscale-0 transition"
              title="Lokasi SIJ"
            ></iframe>
            {/* Note: Link iframe di atas saya ganti pakai link dummy Google Maps agar tidak error. 
                Nanti bisa diganti link asli dari Google Maps Anda. */}
            
            <a
              href="https://goo.gl/maps/..." // Ganti dengan link peta asli
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition"
            >
              <span className="text-white text-xs font-bold bg-amber-500 px-3 py-1 rounded-full">
                Buka Peta
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 pt-8 text-center text-sm">
        © 2025 PT SINO INDAH JAYA. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;