"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../navbar';

const sneakersList = [
  {
    Marque: "Jordan",
    Type_de_produit: "Sneakers",
    Genre: "Homme",
    Couleur: "Vert",
    Référence: "DZ5485-031",
  },
];

const SneakersList = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <main>
      <Navbar />
      <div className="max-w-md mx-auto p-4 border rounded-md shadow-lg bg-white mt-16"> {/* Ajout de la marge supérieure pour déplacer le texte sous la navbar */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold mt-4">Air Jordan 1 Retro High OG "Lucky Green"</h1>
          <p className="mt-2">
            La Air Jordan 1 Retro High OG "Lucky Green" incarne l'essence de l'audace et de l'élégance, fusionnant le patrimoine emblématique de la ligne Jordan avec une palette de couleurs vives et captivantes. Cette sneaker légendaire offre une interprétation contemporaine du design classique, capturant l'admiration des amateurs de sneakers et des passionnés de mode.
          </p>
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