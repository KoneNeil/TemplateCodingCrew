"use client";
import { useCookies } from "react-cookie";
import React, { useState, useEffect } from 'react';
import { createServerClient } from "@supabase/ssr";
import Navbar from "../../navbar";

export default function Page({ params }: { params: { id: string } }) {
  const [cookies, setCookie] = useCookies();
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

  const [models, setModels] = useState<any[]>([]);

  useEffect(() => {
    const fetchModels = async () => {
      const { data, error } = await supabase
        .from("models")
        .select("*")
        .eq('id', targetId);

      if (data) {
        setModels(data);
      } else {
        console.error("Error fetching models:", error);
      }
    };

    fetchModels();
  }, [targetId]);

  const SneakersList = () => {
    const [showDetails, setShowDetails] = useState(false);

    return (
      <main>
        <Navbar />
        <div className="container mx-auto p-4 mt-16">
          {models.map((model: any) => (
            <div key={model.id} className="flex bg-white rounded-md shadow-md mb-8 overflow-hidden">
              <img src={model.imageUrl} alt={model.name} className="w-1/3 h-auto rounded-l-md" />
              <div className="flex-1 p-4">
                <h1 className="text-2xl font-semibold mb-2">{model.name}</h1>
                <p className="text-gray-600 mb-4">{model.description}</p>
                <button
                  className={`bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition-all ${showDetails ? 'bg-gray-500' : ''}`}
                  onClick={() => setShowDetails(!showDetails)}
                >
                  Informations
                </button>
                {showDetails && (
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold">{model.marque}</h2>
                    <p></p>
                    <p><strong>Type de produit :</strong> {model.typeproduit}</p>
                    <p><strong>Couleur : </strong>{model.couleur}</p>
                    <p><strong>Matériaux : </strong>{model.materiaux}</p>
                    <p><strong>Référence : </strong>{model.reference}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  };

  return <SneakersList />;
}
