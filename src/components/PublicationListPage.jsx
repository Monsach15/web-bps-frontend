
import React, { useState } from 'react';
import { usePublications } from '../hooks/usePublications';
import { useNavigate } from 'react-router-dom';

export default function PublicationListPage() {
  const { publications, deletePublication } = usePublications();
  const navigate = useNavigate();

  // State untuk modal detail publikasi
  const [showModal, setShowModal] = useState(false);
  const [modalPub, setModalPub] = useState(null);

  // State untuk search
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Daftar judul publikasi yang cocok untuk suggestion
  const suggestions = searchQuery
    ? publications
        .filter(pub => pub.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5)
    : [];

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus publikasi ini?");
    if (!confirm) return;

    try {
      await deletePublication(id);
      alert("Publikasi berhasil dihapus.");
    } catch (error) {
      alert("Gagal menghapus publikasi: " + error.message);
    }
  };

  const openModal = (pub) => {
    setModalPub(pub);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setModalPub(null);
  };

  // Filter publikasi sesuai search
  const filteredPublications = publications.filter(pub => {
    const q = searchQuery.toLowerCase();
    return (
      pub.title.toLowerCase().includes(q) ||
      (pub.description && pub.description.toLowerCase().includes(q))
    );
  });

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      {/* Modal Detail Publikasi */}
      {showModal && modalPub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold">&times;</button>
            <h3 className="text-xl font-bold mb-4 text-sky-800">{modalPub.title}</h3>
            <p className="text-gray-700 whitespace-pre-line">{modalPub.description}</p>
          </div>
        </div>
      )}
      <header className="mb-8 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Daftar Publikasi BPS Provinsi Bengkulu</h1>
        <p className="text-gray-500 mt-1">Sumber data publikasi terkini</p>
      </header>
      {/* Search input */}
      <div className="mb-8 flex justify-center relative">
        <div className="w-full max-w-xl relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <input
            type="text"
            placeholder="Cari publikasi..."
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-full bg-white focus:border-gray-500 text-sm outline-none"
          />
          {/* Suggestion dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-56 overflow-y-auto">
              {suggestions.map((pub, idx) => (
                <li
                  key={pub.id}
                  className="px-4 py-2 cursor-pointer hover:bg-sky-100 text-gray-700"
                  onMouseDown={() => {
                    setSearchQuery(pub.title);
                    setShowSuggestions(false);
                  }}
                >
                  {pub.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-xl rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-white uppercase bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-center w-16">No</th>
              <th className="px-6 py-3">Judul</th>
              <th className="px-6 py-3">Deskripsi</th>
              <th className="px-6 py-3">Tanggal Rilis</th>
              <th className="px-6 py-3 text-center">Sampul</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredPublications.map((pub, idx) => (
              <tr key={pub.id} className="bg-white border-b hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 font-medium text-gray-900 text-center">{idx + 1}</td>
                <td className="px-6 py-4 font-semibold text-gray-800 align-middle">{pub.title}</td>
                <td className="px-6 py-4 text-gray-600 align-middle max-w-xs break-words whitespace-normal">
                  <span className="block line-clamp-3">
                    {pub.description && pub.description.length > 120
                      ? <>
                          {pub.description.slice(0, 120) + '... '}
                          <span className="text-sky-700 font-semibold cursor-pointer hover:underline" onClick={() => openModal(pub)}>lihat selengkapnya</span>
                        </>
                      : pub.description || '-'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{pub.releaseDate}</td>
                <td className="px-6 py-4 align-middle text-center">
                  <img
                    src={pub.coverUrl}
                    alt={`Sampul ${pub.title}`}
                    className="h-24 w-auto object-cover rounded shadow-md mx-auto"
                    onError={e => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x140/cccccc/ffffff?text=Error'; }}
                  />
                </td>
                <td className="px-6 py-4 text-center align-middle">
                  <div className="flex flex-row flex-wrap gap-2 justify-center items-center">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs font-semibold min-w-[80px]"
                      onClick={() => navigate(`/publications/edit/${pub.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold min-w-[80px]"
                      onClick={() => handleDelete(pub.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredPublications.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">Tidak ada publikasi yang ditemukan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}