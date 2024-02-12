"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../navbar';

const sneakersList = [
    {
        Marque: "Jordan",
    Type_de_produit: "Sneakers",
    Genre: "Homme",
    Couleur: "Rouge et Blanc",
    Référence: "FJ3459-160",
    },
];

const SneakersList = () => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <main>
            <Navbar />
            <div className="max-w-md mx-auto p-4 border rounded-md shadow-lg bg-white mt-16">
                <div className="mb-4">
                    <h1 className="text-2xl font-semibold mt-4">Air Jordan 1 Low "White Dune"</h1>
                    <p className="mt-2">
                    La Air Jordan 1 Low "White Dune" incarne l'essence moderne et l'héritage emblématique de la ligne Jordan. Cette sneaker captivante fusionne avec grâce un design contemporain tout en rendant hommage de manière subtile à l'histoire légendaire de la marque. Sa palette de couleurs épurée, avec des nuances de blanc dune, ajoute une touche distinctive, symbolisant l'équilibre parfait entre un style avant-gardiste et un profond respect pour l'héritage des Air Jordan 1. La fusion harmonieuse de matériaux de haute qualité et de détails raffinés assure un confort exceptionnel, incarnant ainsi la persévérance de Jordan dans l'excellence.                    </p>
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