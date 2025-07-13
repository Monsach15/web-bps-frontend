import React from 'react';
import logobps from '../assets/logobps.png';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] py-8 px-2 bg-gradient-to-b from-sky-50 to-white">
      <div className="flex flex-col items-center mb-8">
        <img src={logobps} alt="Logo BPS" className="h-20 w-20 mb-4 drop-shadow-lg" />
        <h1 className="text-3xl sm:text-4xl font-bold text-sky-900 text-center mb-2">BPS PROVINSI BENGKULU</h1>
        <p className="text-gray-600 text-center max-w-xl">
          Badan Pusat Statistik (BPS) Provinsi Bengkulu adalah lembaga pemerintah non-kementerian yang bertugas menyediakan data statistik berkualitas untuk pembangunan daerah Bengkulu. <br /> <br /> Temukan publikasi, data, dan galeri kegiatan terbaru di aplikasi ini.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        <Link to="/publications" className="group bg-gradient-to-br from-sky-500 to-sky-800 hover:from-sky-600 hover:to-sky-900 text-white rounded-xl shadow-md p-6 flex flex-col items-center transition">
          <div className="bg-sky-800 rounded-full p-4 mb-3">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2 2 2h4a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
          </div>
          <h2 className="text-lg font-bold mb-1">Daftar Publikasi</h2>
          <p className="text-white/90 text-center text-sm">Lihat dan akses publikasi resmi BPS Bengkulu.</p>
        </Link>
        <Link to="/galeri" className="group bg-gradient-to-br from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white rounded-xl shadow-md p-6 flex flex-col items-center transition">
          <div className="bg-orange-600 rounded-full p-4 mb-3">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h2l2-3h6l2 3h2a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2zm9 4a3 3 0 100 6 3 3 0 000-6z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold mb-1">Galeri Kegiatan</h2>
          <p className="text-white/90 text-center text-sm">Dokumentasi foto kegiatan BPS Bengkulu.</p>
        </Link>
        <Link to="/publications/add" className="group bg-gradient-to-br from-green-400 to-green-700 hover:from-green-500 hover:to-green-800 text-white rounded-xl shadow-md p-6 flex flex-col items-center transition">
          <div className="bg-green-700 rounded-full p-4 mb-3">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          </div>
          <h2 className="text-lg font-bold mb-1">Tambah Publikasi</h2>
          <p className="text-white/90 text-center text-sm">Upload publikasi baru untuk BPS Bengkulu.</p>
        </Link>
      </div>
    </main>
  );
}
