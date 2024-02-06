"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../navbar';

const sneakersList = [
  {
    Marque: "Jordan",
    Type_de_produit: "Sneakers",
    Genre: "Homme",
    Couleur: "Violet et Blanc",
    Référence: "DZ5485-105",
  },
];

const SneakersList = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <main>
      <Navbar />
    <div className="max-w-md mx-auto p-4 border rounded-md shadow-lg bg-white mt-16">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold mt-4">Air Jordan 1 Retro High OG "Sky J Mauve"</h1>
        <p className="mt-2">
        La Air Jordan 1 Retro High OG "Sky J Mauve" incarne l'élégance audacieuse et l'héritage emblématique de la ligne Jordan. Cette chaussure de basket-ball emblématique marie parfaitement le style contemporain et l'hommage à l'héritage historique de la marque. Arborant une palette de couleurs captivante, le Mauve céleste, qui évoque les nuances du crépuscule, enveloppe la tige en cuir premium, conférant une esthétique raffinée et moderne.        </p>
      </div>
      <button
        className={`bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition-all ${showDetails ? 'bg-gray-500' : ''}`}
        onClick={() => setShowDetails(!showDetails)}
      >
        Informations
      </button>
      {showDetails && sneakersList.map((sneaker, index) => (
        <div key={index} className="mt-4">
          <h2 className="text-lg font-semibold">{sneaker.Marque}</h2>
          <p>Type de produit: {sneaker.Type_de_produit}</p>
          <p>Genre: {sneaker.Genre}</p>
          <p>Couleur: {sneaker.Couleur}</p>
          <p>Référence: {sneaker.Référence}</p>
        </div>
      ))}
    </div>
    </main>
  );
};

export default SneakersList;