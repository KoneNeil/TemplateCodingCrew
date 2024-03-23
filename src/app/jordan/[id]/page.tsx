"use client";
import { useCookies } from "react-cookie";
import React, { useState, useEffect } from 'react';
import { createServerClient } from "@supabase/ssr";
import Navbar from "../../navbar";

export default function Page({ params }: { params: { id: string } }) {
  const [cookies] = useCookies();
  const targetId = params.id;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookies[name];
        },
      },
    }
  );

  const [model, setModel] = useState<any | null>(null);
  const [sizes, setSizes] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: modelData, error: modelError } = await supabase
        .from("models")
        .select("*")
        .eq('id', targetId)
        .single();

      if (modelData) {
        setModel(modelData);
      } else {
        console.error("Error fetching model:", modelError);
      }

      const { data: sizesData, error: sizesError } = await supabase
        .from("sizes")
        .select("size");

      if (sizesData) {
        setSizes(sizesData);
      } else {
        console.error("Error fetching sizes:", sizesError);
      }
    };

    fetchData();
  }, [targetId]);

  const handleSizeClick = (size: string) => {
    setSelectedSize(size === selectedSize ? null : size);
  };

  const SneakersList = () => {
    const [showDetails, setShowDetails] = useState(false);

    function addToCart(model: any): void {
      throw new Error("Function not implemented.");
    }

    return (
      <main>
        <Navbar />
        <div className="container mx-auto p-4 mt-16 relative">
          {model && (
            <div className="flex bg-white rounded-md shadow-md mb-8 overflow-hidden">
              <img src={model.imageUrl} alt={model.name} className="w-1/3 h-auto rounded-l-md object-cover" />
              <div className="flex-1 p-4 relative">
                <h1 className="text-2xl font-semibold mb-2">{model.name}</h1>
                <div className="flex items-center mb-4">
                  <span className="text-xl font-bold text-blue-500">${model.price}</span>
                  {model.oldprice && (
                    <span className="text-sm text-gray-500 ml-2 line-through">
                      ${model.oldprice}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{model.description}</p>
                <div className="flex items-center mb-4">
                  <p className="mr-2"><strong>Tailles :</strong></p>
                  <div className="flex space-x-2">
                    {sizes.map((size: any) => (
                      <span
                        key={size.id}
                        onClick={() => handleSizeClick(size.size)}
                        className={`cursor-pointer px-3 py-1 rounded-md ${selectedSize === size.size
                          ? 'bg-black text-white'
                          : 'bg-gray-200 text-gray-700'
                          }`}
                      >
                        {size.size}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  className={`bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition-all ${showDetails ? 'bg-gray-500' : ''}`}
                  onClick={() => setShowDetails(!showDetails)}
                >
                  Informations
                </button>
                {showDetails && (
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold">{model.marque}</h2>
                    <p><strong>Type de produit :</strong> {model.typeproduit}</p>
                    <p><strong>Couleur : </strong>{model.couleur}</p>
                    <p><strong>Matériaux : </strong>{model.materiaux}</p>
                    <p><strong>Référence : </strong>{model.reference}</p>
                  </div>
                )}
                <button
                  className="bg-black text-white px-4 py-2 rounded-md absolute bottom-4 right-4"
                  onClick={() => addToCart(model)}
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  };

  return <SneakersList />;
}