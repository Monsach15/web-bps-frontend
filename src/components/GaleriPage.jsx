import React, { useState } from 'react';

const images = [
  '/assets/img/gambar1.jpg',
  '/assets/img/gambar2.jpg',
  '/assets/img/gambar3.jpg',
  '/assets/img/gambar4.jpeg',
  '/assets/img/gambar5.jpg',
  '/assets/img/gambar7.jpg',
];

export default function GaleriPage() {
  const [preview, setPreview] = useState(images[0]);

  return (
    <main className="w-full flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-xl">
        {/* Preview besar */}
        <div className="mb-4 w-full aspect-[3/2] bg-gray-100 rounded-lg border-4 border-sky-800 shadow-lg flex items-center justify-center overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="object-cover w-full h-full rounded-lg transition-all duration-200"
          />
        </div>
        {/* Thumbnail grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-xl mx-auto">
          {images.map((img, idx) => (
            <button
              key={img}
              onClick={() => setPreview(img)}
              className={`rounded-md border-2 transition-all duration-200 p-0.5 bg-white focus:outline-none w-full aspect-[3/2]
                ${preview === img ? 'border-sky-800 shadow-md scale-105' : 'border-transparent hover:border-sky-400'}`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="object-cover w-full h-full rounded-md"
              />
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
