"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../navbar';

const sneakersList = [
    {
        Marque: "Jordan",
        Type_de_produit: "Sneakers",
        Genre: "Femme",
        Couleur: "Blanc",
        Matériaux: "Cuir, Caoutchouc et Textile",
        Référence: "DV0991-101",
    },
];

const SneakersList = () => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <main>
            <Navbar />
            <div className="max-w-md mx-auto p-4 border rounded-md shadow-lg bg-white mt-16">
                <div className="mb-4">
                    <h1 className="text-2xl font-semibold mt-4">Air Jordan 1 Mid "Panda"</h1>
                    <p className="mt-2">
                    La Air Jordan 1 Mid "Panda" incarne l'équilibre parfait entre modernité et héritage emblématique au sein de la ligne Jordan. Cette sneaker captivante fusionne avec élégance un design contemporain, tout en rendant hommage de manière subtile à l'histoire légendaire de la marque. Sa palette de couleurs "Panda", mêlant le noir et le blanc, offre une esthétique distinctive, symbolisant l'harmonie entre un style avant-gardiste et un profond respect pour l'héritage des Air Jordan 1. La qualité des matériaux et les détails raffinés s'unissent de manière harmonieuse pour assurer un confort exceptionnel, témoignant de la détermination de Jordan dans la recherche de l'excellence                    </p>
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
                        <p>Matériaux: {sneaker.Matériaux}</p>
                        <p>Référence: {sneaker.Référence}</p>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default SneakersList;