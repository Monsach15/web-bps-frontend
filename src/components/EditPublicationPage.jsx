import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePublications } from '../hooks/usePublications';
import { uploadImageToCloudinary } from '../services/publicationService';

export default function EditPublicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { publications, editPublication } = usePublications();
  const publication = publications.find(pub => pub.id === Number(id));

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [coverFile, setCoverFile] = useState(null);
  const [coverUrl, setCoverUrl] = useState('');

  // Isi form dengan data awal
  useEffect(() => {
    if (publication) {
      setTitle(publication.title || '');
      setDescription(publication.description || '');
      setReleaseDate(publication.releaseDate || '');
      setCoverUrl(publication.coverUrl || '');
    }
  }, [publication]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !releaseDate) {
      alert('Judul dan Tanggal Rilis harus diisi!');
      return;
    }

    let finalCoverUrl = coverUrl;

    // Jika ada file baru, upload ke Cloudinary
    if (coverFile) {
      try {
        finalCoverUrl = await uploadImageToCloudinary(coverFile);
      } catch (err) {
        alert('Gagal mengunggah gambar: ' + err.message);
        return;
      }
    }

    const updatedPublication = {
      ...publication,
      title,
      description,
      releaseDate,
      coverUrl: finalCoverUrl,
    };

    try {
      await editPublication(updatedPublication);
      navigate('/publications');
    } catch (err) {
      alert('Gagal menyimpan perubahan: ' + err.message);
    }
  };

  if (!publication) {
    return <div className="text-center mt-10">Publikasi tidak ditemukan.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Form Edit Publikasi</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
            placeholder="Contoh Indikator Ekonomi Bengkulu 2025"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
            placeholder="Contoh: Publikasi ini membahas Indikator Ekonomi Bengkulu 2025 secara mendalam."
            rows={4}
          />
        </div>
        <div>
          <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Rilis</label>
          <input
            type="date"
            id="releaseDate"
            value={releaseDate}
            onChange={e => setReleaseDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
          />
        </div>

        <div>
          <label htmlFor="cover" className="block text-sm font-medium text-gray-700 mb-1">Sampul Baru (opsional)</label>
          <input
            type="file"
            id="cover"
            accept="image/*"
            onChange={e => setCoverFile(e.target.files[0])}
            className="w-full border border-gray-300 rounded-md shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:bg-gray-300 file:text-gray-700 file:font-semibold hover:file:bg-gray-400"
          />
          {coverUrl && (
            <div className="mt-2">
              <span className="text-sm text-gray-600">Sampul saat ini:</span>
              <img
                src={coverUrl}
                alt="Current Cover"
                className="h-40 mt-1 rounded shadow-md"
              />
            </div>
          )}
          {coverFile && (
            <div className="mt-2">
              <span className="text-sm text-gray-600">Preview Sampul Baru:</span>
              <img
                src={URL.createObjectURL(coverFile)}
                alt="Preview Cover"
                className="h-40 mt-1 rounded shadow-md"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/publications')}
            className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
