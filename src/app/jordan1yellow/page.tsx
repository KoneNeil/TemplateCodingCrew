"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../navbar';

const sneakersList = [
  {
    Marque: "Jordan",
    Type_de_produit: "Sneakers",
    Genre: "Homme",
    Couleur: "Noir, Blanc et Jaune",
    Référence: "DZ5485-701",
  },
];

const SneakersList = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <main>
      <Navbar />
    <div className="max-w-md mx-auto p-4 border rounded-md shadow-lg bg-white mt-16">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold mt-4">Air Jordan 1 High "Yellow Ochre"</h1>
        <p className="mt-2">
        La Air Jordan 1 High "Yellow Ochre" capture l'esthétique vibrante et l'héritage légendaire de la ligne Jordan. Cette sneaker emblématique fusionne avec élégance un design moderne avec des hommages subtils à l'héritage emblématique de la marque. Rehaussée de nuances saisissantes de jaune ocre, elle incarne la combinaison parfaite entre style contemporain et respect pour l'histoire de la marque, offrant une expression audacieuse de l'essence emblématique des Air Jordan 1.</p>
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